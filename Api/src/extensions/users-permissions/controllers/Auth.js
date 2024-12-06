const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;

    // Check if identifier and password exist
    if (!identifier || !password) {
      return ctx.badRequest("Please provide both identifier and password.");
    }

    // Fetch the user by email (or username, depending on your use case)
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ email: identifier });

    if (!user) {
      return ctx.badRequest("User not found.");
    }

    // Validate password
    const validPassword = await strapi.plugins[
      "users-permissions"
    ].services.user.validatePassword(password, user.password);
    if (!validPassword) {
      return ctx.badRequest("Invalid credentials.");
    }

    // Populate the cart relation for the logged-in user
    const userWithCart = await strapi
      .query("user", "users-permissions")
      .findOne(
        { id: user.id },
        ["cart", "cart.products"] // Populate cart and any related fields like products
      );

    // Generate JWT
    const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id,
    });

    // Sanitize the user entity to exclude sensitive information
    const sanitizedUser = sanitizeEntity(userWithCart, {
      model: strapi.plugins["users-permissions"].models.user,
    });

    // Return the response with the JWT and sanitized user data
    return ctx.send({
      jwt,
      user: sanitizedUser,
    });
  },
};
