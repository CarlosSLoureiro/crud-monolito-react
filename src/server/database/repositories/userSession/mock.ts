import { UserSessionFactory } from "@server/database/entities/userSession/factory";

import type { UserSessionRepository } from ".";

export const UserSessionRepositoryMock: jest.Mocked<
  Omit<typeof UserSessionRepository, `prototype`>
> = {
  create: jest.fn().mockResolvedValue(new UserSessionFactory()),
  findById: jest.fn().mockResolvedValue(new UserSessionFactory()),
  findBySession: jest.fn().mockResolvedValue(new UserSessionFactory()),
  update: jest.fn().mockResolvedValue(new UserSessionFactory()),
  revoke: jest.fn().mockResolvedValue(new UserSessionFactory()),
};

jest.mock(`.`, () => {
  return {
    UserSessionRepository: UserSessionRepositoryMock,
  };
});
