import jwt from "jsonwebtoken";

import { type AuthenticatedUser } from "@server/middlewares/authenticated";

export const getAuthenticatedUser = (request: Request) => {
  const authorization = request.headers.get(`Authorization`) || ``;
  const accessToken = authorization.split(`Bearer `)[1];
  const authenticatedUser = jwt.verify(accessToken, process.env.SECRET) as AuthenticatedUser;
  return authenticatedUser;
};
