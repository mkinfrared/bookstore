const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  dropSchema: true,
  entities: ["src/db/entity/**/*.ts"],
  migrations: ["src/db/migration/**/*.ts"],
  subscribers: ["src/db/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/db/entity",
    migrationsDir: "src/db/migration",
    subscribersDir: "src/db/subscriber"
  }
};
