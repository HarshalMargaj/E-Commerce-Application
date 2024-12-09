"use strict";

const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;

    const lineItems = await Promise.all(
      products.map(async (item) => {
        const item = await strapi
          .service("api::product.product")
          .findOne(item.id);
      })
    );

    try {
      const session = stripe.checkout.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
      });
    } catch (error) {}
  },
}));
