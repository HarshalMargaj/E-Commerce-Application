module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "postgres"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD"),
      ssl: {
        rejectUnauthorized: false,
      },
      schema: env("DATABASE_SCHEMA", "public"),
    },
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 10),
    },
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  },
});

// module.exports = ({ env }) => ({
//   connection: {
//     client: "postgres",
//     connection: {
//       connectionString: env("DATABASE_URL"),
//       ssl: {
//         rejectUnauthorized: false,
//       },
//       schema: env("DATABASE_SCHEMA", "public"),
//     },
//     pool: {
//       min: env.int("DATABASE_POOL_MIN", 2),
//       max: env.int("DATABASE_POOL_MAX", 10),
//     },
//     acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
//   },
// });
