import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { StatusCodes } from "http-status-codes";

import { UserFactory } from "@server/database/entities/user/factory";
import { UserSessionFactory } from "@server/database/entities/userSession/factory";
import { UserRepositoryMock, UserSessionRepositoryMock } from "@server/database/mocks";

import { AuthService } from "@server/services/auth";

import { AuthenticatedMiddleware } from ".";

describe(`AuthenticatedMiddleware`, () => {
  it(`should validated authenticated user with success`, async () => {
    // Arrange
    const user = new UserFactory();
    user.password = CryptoJS.SHA256(`password`).toString();
    const userSession = new UserSessionFactory();
    userSession.userId = user.id;

    // Mock
    UserRepositoryMock.findById.mockResolvedValueOnce(user);
    UserSessionRepositoryMock.findBySession.mockResolvedValue(userSession);
    UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
    const { accessToken } = await AuthService.createTokens({
      user,
      userAgent: userSession.userAgent,
      ip: userSession.ip,
    });
    const NextResponseJson = jest.spyOn(NextResponse, `json`);

    // Arrange
    const request = new Request(`https://localhost/api/test`, {
      method: `GET`,
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });

    const response = await AuthenticatedMiddleware(request);

    // Assert
    expect(response).toBeUndefined();
    expect(NextResponseJson).not.toHaveBeenCalled();
  });
  it(`should throw error if don't have Authorization in request`, async () => {
    // Arrange
    const request = new Request(`https://localhost/api/test`, { method: `GET` });

    // Mock
    const NextResponseJson = jest.spyOn(NextResponse, `json`);

    // Act
    const response = await AuthenticatedMiddleware(request);

    // Assert
    expect(response).toBeDefined();
    expect(NextResponseJson).toHaveBeenLastCalledWith(
      { message: `Token de acesso não informado` },
      { status: StatusCodes.UNAUTHORIZED },
    );
  });

  it(`should throw error if access token is expired`, async () => {
    // Arrange
    const user = new UserFactory();
    const userSession = new UserSessionFactory();
    userSession.userId = user.id;

    // Mock
    jest.useFakeTimers();
    UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
    const { accessToken } = await AuthService.createTokens({
      user,
      userAgent: userSession.userAgent,
      ip: userSession.ip,
    });
    jest.advanceTimersByTime(20 * 60 * 1000);
    const NextResponseJson = jest.spyOn(NextResponse, `json`);

    // Arrange
    const request = new Request(`https://localhost/api/test`, {
      method: `GET`,
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });

    const response = await AuthenticatedMiddleware(request);

    // Assert
    expect(response).toBeDefined();
    expect(NextResponseJson).toHaveBeenLastCalledWith(
      { message: `Token de acesso expirado` },
      { status: StatusCodes.UNAUTHORIZED },
    );
  });

  describe(`should throw error if access token is invalid`, () => {
    it(`when access token is from a invalid session`, async () => {
      // Arrange
      const user = new UserFactory();
      const userSession = new UserSessionFactory();
      userSession.userId = user.id;

      // Mock
      UserSessionRepositoryMock.findBySession.mockResolvedValue(null);
      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { accessToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });
      const NextResponseJson = jest.spyOn(NextResponse, `json`);

      // Arrange
      const request = new Request(`https://localhost/api/test`, {
        method: `GET`,
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
        }),
      });

      const response = await AuthenticatedMiddleware(request);

      // Assert
      expect(response).toBeDefined();
      expect(NextResponseJson).toHaveBeenLastCalledWith(
        { message: `Sessão inválida` },
        { status: StatusCodes.UNAUTHORIZED },
      );
    });

    it(`when access token is from a revoked session`, async () => {
      // Arrange
      const user = new UserFactory();
      const userSession = new UserSessionFactory();
      userSession.revoked = true;

      userSession.userId = user.id;

      // Mock
      UserSessionRepositoryMock.findBySession.mockResolvedValue(userSession);
      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { accessToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });
      const NextResponseJson = jest.spyOn(NextResponse, `json`);

      // Arrange
      const request = new Request(`https://localhost/api/test`, {
        method: `GET`,
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
        }),
      });

      const response = await AuthenticatedMiddleware(request);

      // Assert
      expect(response).toBeDefined();
      expect(NextResponseJson).toHaveBeenLastCalledWith(
        { message: `Sessão inválida` },
        { status: StatusCodes.UNAUTHORIZED },
      );
    });

    it(`when access token is from a distinct user id`, async () => {
      // Arrange
      const user = new UserFactory();
      user.id = 11;
      const userSession = new UserSessionFactory();
      userSession.userId = 22;

      // Mock
      UserSessionRepositoryMock.findBySession.mockResolvedValue(userSession);
      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { accessToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });
      const NextResponseJson = jest.spyOn(NextResponse, `json`);

      // Arrange
      const request = new Request(`https://localhost/api/test`, {
        method: `GET`,
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
        }),
      });

      const response = await AuthenticatedMiddleware(request);

      // Assert
      expect(response).toBeDefined();
      expect(NextResponseJson).toHaveBeenLastCalledWith(
        { message: `Sessão inválida` },
        { status: StatusCodes.UNAUTHORIZED },
      );
    });
  });

  describe(`should throw error if user from access token is invalid`, () => {
    it(`when access user is invalid`, async () => {
      // Arrange
      const user = new UserFactory();
      const userSession = new UserSessionFactory();
      userSession.userId = user.id;

      // Mock
      UserSessionRepositoryMock.findBySession.mockResolvedValue(userSession);
      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { accessToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });
      const NextResponseJson = jest.spyOn(NextResponse, `json`);

      // Arrange
      const request = new Request(`https://localhost/api/test`, {
        method: `GET`,
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
        }),
      });

      const response = await AuthenticatedMiddleware(request);

      // Assert
      expect(response).toBeDefined();
      expect(NextResponseJson).toHaveBeenLastCalledWith(
        { message: `Usuário inválido` },
        { status: StatusCodes.UNAUTHORIZED },
      );
    });

    it(`when access user password is invalid`, async () => {
      // Arrange
      const user = new UserFactory();
      user.password = CryptoJS.SHA256(`wrong password`).toString();
      const userSession = new UserSessionFactory();
      userSession.userId = user.id;

      // Mock
      UserRepositoryMock.findById.mockResolvedValueOnce({
        ...user,
        password: CryptoJS.SHA256(`password`).toString(),
      });
      UserSessionRepositoryMock.findBySession.mockResolvedValue(userSession);
      UserSessionRepositoryMock.create.mockResolvedValueOnce(userSession);
      const { accessToken } = await AuthService.createTokens({
        user,
        userAgent: userSession.userAgent,
        ip: userSession.ip,
      });
      const NextResponseJson = jest.spyOn(NextResponse, `json`);

      // Arrange
      const request = new Request(`https://localhost/api/test`, {
        method: `GET`,
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
        }),
      });

      const response = await AuthenticatedMiddleware(request);

      // Assert
      expect(response).toBeDefined();
      expect(NextResponseJson).toHaveBeenLastCalledWith(
        { message: `Usuário inválido` },
        { status: StatusCodes.UNAUTHORIZED },
      );
    });
  });
});
