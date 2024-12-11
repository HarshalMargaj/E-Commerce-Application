module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:5173",
        "https://clothesofshopvista.netlify.app/",
      ], // Allow your frontend URLs
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // HTTP methods to allow
      headers: ["Content-Type", "Authorization"], // Allow required headers
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
