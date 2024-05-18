/* eslint-disable no-console */

import { Sequelize } from "sequelize-typescript";

const models: never[] = [];

console.log(process.env);

const { MYSQL_BASE, MYSQL_USER, MYSQL_PASS, MYSQL_HOST } = {
  MYSQL_BASE: `app`,
  MYSQL_USER: `root`,
  MYSQL_PASS: `9030`,
  MYSQL_HOST: `localhost`,
};

export const Database = new Sequelize(MYSQL_BASE, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  logging: false,
  dialect: `mysql`,
  dialectModule: require(`mysql2`),
  models,
});

if (process.env.NEXT_IS_EXPORT_WORKER !== `true`) {
  Database.sync({ force: false })
    .then(() => {
      console.log(`\x1b[32m`, `✓ Successfully connected to the Database!`, `\x1b[0m`);
    })
    .catch(e => {
      console.log(e);
      console.log(`\x1b[31m`, `✓ Failed to connect to the Database!`, `\x1b[0m`);
    });
}
