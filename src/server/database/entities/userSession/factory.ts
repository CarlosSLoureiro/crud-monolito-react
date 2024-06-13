import { fakerPT_BR as faker } from "@faker-js/faker";

import { type UserSession } from "..";

export class UserSessionFactory implements UserSession {
  id = faker.number.int();
  session = faker.string.uuid();
  userId = faker.number.int();
  userAgent = faker.internet.userAgent();
  revoked = false;
  ip = faker.internet.ip();
  updatedAt = new Date();
  createdAt = new Date();
}
