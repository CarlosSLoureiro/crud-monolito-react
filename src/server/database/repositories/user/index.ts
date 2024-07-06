import { Database } from "../..";
import { User } from "../../entities";

const userRepository = Database.getRepository(User);

export abstract class UserRepository {
  static async findById(id: number) {
    const user = await userRepository.findOne({
      where: { id },
    });

    return user;
  }

  static async updatePassword(user: User, password: string) {
    user.password = password;
    return await userRepository.save(user);
  }

  static async findByEmail(email: string) {
    const user = await userRepository.findOne({
      where: { email },
    });

    /* dispara erro proposital:
    const query = userRepository.createQueryBuilder(`user`);
    query.where(`user.emai = :email`, { email });
    query.leftJoinAndSelect(`user.sessions`, `session`);
    const user = await query.getOne();
    */
    return user;
  }

  static async create(data: Partial<User>) {
    const user = userRepository.create(data);
    return await userRepository.save(user);
  }
}
