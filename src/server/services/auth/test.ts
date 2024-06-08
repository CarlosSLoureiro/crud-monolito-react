import CryptoJS from "crypto-js";

import { UserFactory } from "@server/database/entities/user/factory";
import { UserRepositoryMock } from "@server/database/mocks";

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
});
