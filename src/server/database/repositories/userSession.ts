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

  static async findById(id: number) {
    return await userSessionRepository.findOne({
      where: { id },
    });
  }

  static async findBySession(session: string) {
    return await userSessionRepository.findOne({
      where: { session },
    });
  }

  static async update(session: string, data: Partial<UserSession>) {
    return await userSessionRepository.update({ session }, data);
  }
}
