import { UserFactory } from "@server/database/entities/user/factory";

import type { UserRepository } from ".";

export const UserRepositoryMock: jest.Mocked<Omit<typeof UserRepository, `prototype`>> = {
  findByEmail: jest.fn().mockResolvedValue(new UserFactory()),
  findById: jest.fn().mockResolvedValue(new UserFactory()),
  updatePassword: jest.fn().mockResolvedValue(new UserFactory()),
};

jest.mock(`.`, () => {
  return {
    UserRepository: UserRepositoryMock,
  };
});
