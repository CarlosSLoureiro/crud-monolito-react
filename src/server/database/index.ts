import { DataSource } from "typeorm";

import * as entities from "./entities";

import "reflect-metadata";

export const Database = new DataSource({
  type: `mysql`,
  driver: require(`mysql2`),
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_BASE,
  logging: false,
  synchronize: true,
  entities: Object.values(entities),
  migrations: [],
  subscribers: [],
});

if (!Database.isInitialized && process.env.NEXT_IS_EXPORT_WORKER !== `true`) {
  try {
    await Database.initialize();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Database Error:`, error);
  }
}
