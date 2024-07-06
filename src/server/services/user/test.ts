import CryptoJS from "crypto-js";

import { UserFactory } from "@server/database/entities/user/factory";
import { UserRepositoryMock } from "@server/database/mocks";

import { GenericError } from "@server/errors/generic";
import { ValidationError } from "@server/utils/validator/error";

import { fakerPT_BR as faker } from "@faker-js/faker";

import { UserService } from ".";
import { type UserServiceChangePasswordParams } from "./types";

describe(`UserService`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`changePassword`, () => {
    it(`should throw an error if new password have length < 8`, async () => {
      // Arrange
      const params: UserServiceChangePasswordParams = {
        id: faker.number.int(),
        currentPassword: faker.internet.password(),
        newPassword: `1234567`,
        confirmNewPassword: `1234567`,
      };

      try {
        // Act
        await UserService.changePassword(params);
        fail(`should throw an error if new password have length < 8`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toHaveProperty(`message`, `A senha deve conter no mínimo 8 caracteres`);
      }
    });

    it(`should throw an error if new password contains only numbers`, async () => {
      // Arrange
      const params: UserServiceChangePasswordParams = {
        id: faker.number.int(),
        currentPassword: faker.internet.password(),
        newPassword: `12345678`,
        confirmNewPassword: `12345678`,
      };

      try {
        // Act
        await UserService.changePassword(params);
        fail(`should throw an error if new password contains only numbers`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toHaveProperty(`message`, `A senha deve conter letras e números`);
      }
    });

    it(`should throw an error if new password contains only letters`, async () => {
      // Arrange
      const params: UserServiceChangePasswordParams = {
        id: faker.number.int(),
        currentPassword: faker.internet.password(),
        newPassword: `abcdefgh`,
        confirmNewPassword: `abcdefgh`,
      };

      try {
        // Act
        await UserService.changePassword(params);
        fail(`should throw an error if new password contains only letters`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toHaveProperty(`message`, `A senha deve conter letras e números`);
      }
    });

    it(`should throw an error if new password is different from confirm new password`, async () => {
      // Arrange
      const params: UserServiceChangePasswordParams = {
        id: faker.number.int(),
        currentPassword: faker.internet.password(),
        newPassword: `C4RLOS-LOUR3IR0`,
        confirmNewPassword: `C4RLOS_LOUR3IR0`,
      };

      try {
        // Act
        await UserService.changePassword(params);
        fail(`should throw an error if new password is different from confirm new password`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toHaveProperty(`message`, `As senhas não coincidem`);
      }
    });

    it(`should throw an error if the user does not exist`, async () => {
      // Arrange
      const params: UserServiceChangePasswordParams = {
        id: faker.number.int(),
        currentPassword: faker.internet.password(),
        newPassword: `C4RLOS-LOUR3IR0`,
        confirmNewPassword: `C4RLOS-LOUR3IR0`,
      };

      // Mock
      UserRepositoryMock.findById.mockResolvedValue(null);

      try {
        // Act
        await UserService.changePassword(params);
        fail(`should throw an error if the user does not exist`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(GenericError);
        expect(error).toHaveProperty(`message`, `Usuário não encontrado`);
      }
    });

    it(`should throw an error if the current password is incorrect`, async () => {
      // Arrange
      const user = new UserFactory();
      const params: UserServiceChangePasswordParams = {
        id: user.id,
        currentPassword: `wrong password`,
        newPassword: `C4RLOS-LOUR3IR0`,
        confirmNewPassword: `C4RLOS-LOUR3IR0`,
      };
      user.password = CryptoJS.SHA256(`correct password`).toString();

      // Mock
      UserRepositoryMock.findById.mockResolvedValue(user);

      try {
        // Act
        await UserService.changePassword(params);
        fail(`should throw an error if the current password is incorrect`);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toHaveProperty(`message`, `A senha atual está incorreta`);
      }
    });

    it(`should change the password with success`, async () => {
      // Arrange
      const user = new UserFactory();
      const params: UserServiceChangePasswordParams = {
        id: user.id,
        currentPassword: `correct password`,
        newPassword: `C4RLOS-LOUR3IR0`,
        confirmNewPassword: `C4RLOS-LOUR3IR0`,
      };
      user.password = CryptoJS.SHA256(params.currentPassword).toString();

      // Mock
      UserRepositoryMock.findById.mockResolvedValue(user);

      // Act
      const result = await UserService.changePassword(params);

      // Assert
      expect(result).toBeDefined();
      expect(UserRepositoryMock.updatePassword).toHaveBeenCalledWith(
        user,
        CryptoJS.SHA256(params.newPassword).toString(),
      );
    });
  });
});
