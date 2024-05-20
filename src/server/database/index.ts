/* eslint-disable no-console */
import { DataSource } from "typeorm";

import { RefreshToken } from "./entities/refreshToken";
import { User } from "./entities/user";

import "reflect-metadata";

const entities = [User, RefreshToken];

const { MYSQL_BASE, MYSQL_USER, MYSQL_PASS, MYSQL_HOST } = {
  MYSQL_BASE: `app`,
  MYSQL_USER: `root`,
  MYSQL_PASS: `9030`,
  MYSQL_HOST: `localhost`,
};

export const Database = new DataSource({
  type: `mysql`,
  driver: require(`mysql2`),
  host: MYSQL_HOST,
  port: 3306,
  username: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_BASE,
  logging: true,
  synchronize: true,
  entities,
  migrations: [],
  subscribers: [],
});

if (!Database.isInitialized && process.env.NEXT_IS_EXPORT_WORKER !== `true`) {
  try {
    await Database.initialize();
  } catch (error) {
    console.error(`Database error:`, error);
  }
}
