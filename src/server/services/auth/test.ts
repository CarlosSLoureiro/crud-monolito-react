import CryptoJS from "crypto-js";

import { UserFactory } from "@server/database/entities/user/factory";
import { UserSessionFactory } from "@server/database/entities/userSession/factory";
import { UserRepositoryMock, UserSessionRepositoryMock } from "@server/database/mocks";

import { GenericError } from "@server/errors/generic";
import { ValidationError } from "@server/utils/validator/error";

import { fakerPT_BR as faker } from "@faker-js/faker";

import { AuthService } from ".";
import { type AuthServiceLoginParams } from "./types";

describe(`AuthService`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`login`, () => {
    it(`should throw an error if the user does not exist`, async () => {
      // Arrange
      const params: AuthServiceLoginParams = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        userAgent: faker.internet.userAgent(),
        ip: faker.internet.ip(),
      };

      // Mock
      UserRepositoryMock.findByEmail.mockResolvedValue(null);

      try {
        // Act
        await AuthService.login(params);
        fail(`should throw an error if the user does not exist`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toHaveProperty(`message`, `Usuário não encontrado`);
      }
    });

    it(`should throw an error if the password is incorrect`, async () => {
      // Arrange
      const user = new UserFactory();
      const params: AuthServiceLoginParams = {
        email: user.email,
        password: `wrong password`,
        userAgent: faker.internet.userAgent(),
        ip: faker.internet.ip(),
      };
      user.password = CryptoJS.SHA256(`password`).toString();

      // Mock
      UserRepositoryMock.findByEmail.mockResolvedValue(user);

      try {
        // Act
        await AuthService.login(params);
        fail(`should throw an error if the password is incorrect`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toHaveProperty(`message`, `Senha inválida`);
      }
    });

    it(`should login with success`, async () => {
      // Arrange
      const user = new UserFactory();
      const params: AuthServiceLoginParams = {
        email: user.email,
        password: `password`,
        userAgent: faker.internet.userAgent(),
        ip: faker.internet.ip(),
      };
      user.password = CryptoJS.SHA256(params.password).toString();

      // Mock
      UserRepositoryMock.findByEmail.mockResolvedValue(user);

      // Act
      const result = await AuthService.login(params);

      // Assert
      expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(params.email);
      expect(result).toHaveProperty(`accessToken`);
      expect(result).toHaveProperty(`refreshToken`);
      expect(result).toHaveProperty(`user`);
      expect(result.user).toHaveProperty(`id`, user.id);
      expect(result.user).toHaveProperty(`name`, user.name);
      expect(result.user).not.toHaveProperty(`password`);
      expect(result.user).not.toHaveProperty(`email`);
    });
  });

  describe(`logout`, () => {
    it(`should logout with success`, async () => {
      // Arrange
      const session = `session-id`;

      // Act
      await AuthService.logout({ session });

      // Assert
      expect(UserSessionRepositoryMock.revoke).toHaveBeenCalledWith(session);
    });
  });

  describe(`createTokens`, () => {
    it(`should create tokens with success`, async () => {
      // Arrange
      const user = new UserFactory();
      const userAgent = faker.internet.userAgent();
      const ip = faker.internet.ip();

      // Act
      const result = await AuthService.createTokens({
        user,
        userAgent,
        ip,
      });

      // Assert
      expect(UserSessionRepositoryMock.create).toHaveBeenCalledWith(user, {
        session: `uuid-v4`,
        userAgent,
        ip,
      });
      expect(result).toHaveProperty(`accessToken`);
      expect(result).toHaveProperty(`refreshToken`);
    });
  });

  describe(`refreshTokens`, () => {
    it(`should refresh tokens with success`, async () => {
      // Arrange
      const user = new UserFactory();
      const userSession = new UserSessionFactory();
      userSession.userId = user.id;
      userSession.session = `uuid-v4`;

      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { refreshToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });

      // Mock
      UserSessionRepositoryMock.findById.mockResolvedValueOnce(userSession);
      UserRepositoryMock.findById.mockResolvedValueOnce(user);

      // Act
      const result = await AuthService.refreshTokens({
        refreshToken,
      });

      // Assert
      expect(result).toHaveProperty(`accessToken`);
      expect(result).toHaveProperty(`refreshToken`);
      expect(UserSessionRepositoryMock.findById).toHaveBeenCalledWith(userSession.id);
      expect(UserSessionRepositoryMock.update).toHaveBeenCalled();
    });

    it(`should throw error if user password from refresh token is wrong`, async () => {
      // Arrange
      const user = new UserFactory();
      user.password = `password`;
      const userSession = new UserSessionFactory();
      userSession.userId = user.id;
      userSession.session = `uuid-v4`;

      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { refreshToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });

      // Mock
      UserSessionRepositoryMock.findById.mockResolvedValueOnce(userSession);
      UserRepositoryMock.findById.mockResolvedValueOnce({ ...user, password: `wrong password` });

      try {
        // Act
        await AuthService.refreshTokens({
          refreshToken,
        });
        fail(`should throw error if user password is wrong`);
      } catch (error: any) {
        // Assert
        expect(error).toBeInstanceOf(GenericError);
        expect(error).toHaveProperty(`message`, `Token de atualização inválido`);
        expect(UserSessionRepositoryMock.findById).toHaveBeenCalledWith(userSession.id);
        expect(UserSessionRepositoryMock.update).not.toHaveBeenCalled();
      }
    });

    it(`should throw error if refresh token is invalid`, async () => {
      // Arrange
      const user = new UserFactory();
      const userSession = new UserSessionFactory();
      userSession.userId = user.id;

      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { refreshToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });

      try {
        // Act
        await AuthService.refreshTokens({
          refreshToken,
        });
        fail(`should throw error if token is invalid`);
      } catch (error: any) {
        // Assert
        expect(error).toBeInstanceOf(GenericError);
        expect(error).toHaveProperty(`message`, `Token de atualização inválido`);
        expect(UserSessionRepositoryMock.update).not.toHaveBeenCalled();
      }
    });

    it(`should throw error if refresh token is expired`, async () => {
      // Arrange
      const user = new UserFactory();
      const userSession = new UserSessionFactory();
      userSession.userId = user.id;

      // Mock
      jest.useFakeTimers();
      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { refreshToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });
      jest.advanceTimersByTime(8 * 24 * 60 * 60 * 1000);

      try {
        // Act
        await AuthService.refreshTokens({
          refreshToken,
        });
        fail(`should throw error if token is expired`);
      } catch (error: any) {
        // Assert
        expect(error).toBeInstanceOf(GenericError);
        expect(error).toHaveProperty(`message`, `Token de atualização expirado`);
        expect(UserSessionRepositoryMock.update).not.toHaveBeenCalled();
      }
    });
  });
});
