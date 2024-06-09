import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { Server } from "@server";

import { GenericError } from "./errors/generic";
import { ValidationError } from "./utils/validator/error";

describe(`Server`, () => {
  describe(`handle`, () => {
    it(`should return the response from the handler that returns a truthy value (first)`, async () => {
      // Arrange
      const request = new NextRequest(`https://localhost/api/test`, { method: `GET` });
      const handler1 = jest.fn().mockResolvedValue(`Handler 1`);
      const handler2 = jest.fn().mockResolvedValue(`Handler 2`);
      const handler3 = jest.fn().mockResolvedValue(`Handler 3`);
      const handle = Server.handle(handler1, handler2, handler3);

      // Act
      const response = await handle(request);

      // Assert
      expect(handler1).toHaveBeenCalledWith(request.clone());
      expect(handler2).not.toHaveBeenCalled();
      expect(handler3).not.toHaveBeenCalled();
      expect(response).toEqual(`Handler 1`);
    });

    it(`should return the response from the handler that returns a truthy value (second)`, async () => {
      // Arrange
      const request = new NextRequest(`https://localhost/api/test`, { method: `GET` });
      const handler1 = jest.fn().mockResolvedValue(null);
      const handler2 = jest.fn().mockResolvedValue(`Handler 2`);
      const handler3 = jest.fn().mockResolvedValue(`Handler 3`);
      const handle = Server.handle(handler1, handler2, handler3);

      // Act
      const response = await handle(request);

      // Assert
      expect(handler1).toHaveBeenCalledWith(request.clone());
      expect(handler2).toHaveBeenCalledWith(request.clone());
      expect(handler3).not.toHaveBeenCalled();
      expect(response).toEqual(`Handler 2`);
    });

    it(`should return the response from the handler that returns a truthy value (third)`, async () => {
      // Arrange
      const request = new NextRequest(`https://localhost/api/test`, { method: `GET` });
      const handler1 = jest.fn().mockResolvedValue(null);
      const handler2 = jest.fn().mockResolvedValue(null);
      const handler3 = jest.fn().mockResolvedValue(`Handler 3`);
      const handle = Server.handle(handler1, handler2, handler3);

      // Act
      const response = await handle(request);

      // Assert
      expect(handler1).toHaveBeenCalledWith(request.clone());
      expect(handler2).toHaveBeenCalledWith(request.clone());
      expect(handler3).toHaveBeenCalledWith(request.clone());
      expect(response).toEqual(`Handler 3`);
    });

    it(`should return a JSON response with the formatted error message and status code for a ValidationError`, async () => {
      // Arrange
      const request = new NextRequest(`https://localhost/api/test`, { method: `GET` });
      const validationError = new ValidationError(
        `generic-field`,
        `Validation Error`,
        StatusCodes.BAD_REQUEST,
      );
      const handler1 = jest.fn().mockRejectedValue(validationError);
      const handler2 = jest.fn().mockResolvedValue(`Handler 2`);
      const handle = Server.handle(handler1, handler2);

      // Act
      const response = await handle(request);
      const responseBytes = await response?.body?.getReader().read();
      const responseString = new TextDecoder().decode(responseBytes?.value);
      const responseJson = JSON.parse(responseString);

      // Assert
      expect(handler1).toHaveBeenCalledWith(request.clone());
      expect(handler2).not.toHaveBeenCalled();
      expect(responseJson).toEqual(validationError.format());
    });

    it(`should return a JSON response with the error message and status code for a GenericError`, async () => {
      // Arrange
      const request = new NextRequest(`https://localhost/api/test`, { method: `GET` });
      const genericError = new GenericError(`Generic Error`, StatusCodes.BAD_REQUEST);
      const handler1 = jest.fn().mockRejectedValue(genericError);
      const handler2 = jest.fn().mockResolvedValue(`Handler 2`);
      const handle = Server.handle(handler1, handler2);

      // Act
      const response = await handle(request);
      const responseBytes = await response?.body?.getReader().read();
      const responseString = new TextDecoder().decode(responseBytes?.value);
      const responseJson = JSON.parse(responseString);

      // Assert
      expect(handler1).toHaveBeenCalledWith(request.clone());
      expect(handler2).not.toHaveBeenCalled();
      expect(responseJson).toEqual({ message: genericError.message });
    });

    it(`should not capture error to sentry and return a JSON response with the error message and status code for other errors in non-production environment`, async () => {
      // Arrange
      const request = new NextRequest(`https://localhost/api/test`, { method: `GET` });
      const error = new Error(`Unexpected Error`);
      const handler = jest.fn().mockRejectedValue(error);
      const handle = Server.handle(handler);

      // Mock
      const captureException = jest.spyOn(Sentry, `captureException`);

      // Act
      const response = await handle(request);
      const responseBytes = await response?.body?.getReader().read();
      const responseString = new TextDecoder().decode(responseBytes?.value);
      const responseJson = JSON.parse(responseString);

      // Assert
      expect(handler).toHaveBeenCalledWith(request.clone());
      expect(captureException).not.toHaveBeenCalled();
      expect(responseJson).toEqual({ message: error.message });
    });

    it(`should capture error to sentry and return a JSON response with a generic error message for other errors in production environment`, async () => {
      // Arrange
      const request = new NextRequest(`https://localhost/api/test`, { method: `GET` });
      const error = new Error(`Unexpected error`);
      const handler = jest.fn().mockRejectedValue(error);
      const handle = Server.handle(handler);

      // Mock
      const captureException = jest.spyOn(Sentry, `captureException`);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      process.env.NODE_ENV = `production`;

      // Act
      const response = await handle(request);
      const responseBytes = await response?.body?.getReader().read();
      const responseString = new TextDecoder().decode(responseBytes?.value);
      const responseJson = JSON.parse(responseString);

      // Assert
      expect(handler).toHaveBeenCalledWith(request.clone());
      expect(captureException).toHaveBeenCalledWith(error);
      expect(responseJson).toEqual({
        message: `Houve um erro inesperado`,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      process.env.NODE_ENV = `test`;
    });
  });
});
