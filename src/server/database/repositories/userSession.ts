import { type User } from "../entities/user";
import { UserSession } from "../entities/userSession";
import { Database } from "..";

const userSessionRepository = Database.getRepository(UserSession);

export abstract class UserSessionRepository {
  static async create(user: User, data: Pick<UserSession, `session` | `userAgent` | `ip`>) {
    return await userSessionRepository.save({
      ...data,
      userId: user.id,
    });
  }
}
