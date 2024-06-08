jest.mock(`.`, () => {
  return {
    Database: {
      getRepository: jest.fn().mockReturnValue({}),
    },
  };
});

export { UserRepositoryMock } from "./repositories/user/mock";
export { UserSessionRepositoryMock } from "./repositories/userSession/mock";
