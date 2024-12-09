"use strict";

const stripe = require("stripe")(process.env.STRIPE_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;

    // Validate products data
    if (!products || !Array.isArray(products) || products.length === 0) {
      return ctx.badRequest("Invalid products data");
    }

    // Process each product
    const lineItems = await Promise.all(
      products.map(async (product) => {
        const item = await strapi
          .service("api::product.product")
          .findOne(product.product_id);

        if (!item) {
          console.error(`Product with ID ${product.product_id} not found`);
          throw new Error(`Product with ID ${product.product_id} not found`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product_name || "Unknown Product",
            },
            unit_amount: item.product_price * 100, // Convert to cents
          },
          quantity: product.quantity || 1,
        };
      })
    );

    try {
      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        payment_method_types: ["card"],
      });

      // Save order to Strapi
      await strapi.service("api::order.order").create({
        data: {
          products,
          stripeId: session.id,
          user: ctx.state.user, // Attach user if authenticated
        },
      });

      return ctx.send({ stripeSession: session });
    } catch (error) {
      console.error("Order creation error:", error);
      ctx.response.status = 500;
      return { error: error.message || "Internal Server Error" };
    }
  },
}));
