import { fakerPT_BR as faker } from "@faker-js/faker";

import { type User } from "..";

export class UserFactory implements User {
  id = faker.number.int();
  name = faker.person.fullName();
  password = faker.internet.password({
    length: 8,
    pattern: /[A-Za-z]/,
    prefix: `00`,
  });
  email = faker.internet.email();
  updatedAt = new Date();
  createdAt = new Date();
}
