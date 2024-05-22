import { User } from "../entities";
import { Database } from "..";

const userRepository = Database.getRepository(User);

export abstract class UserRepository {
  static async findById(id: number) {
    const user = await userRepository.findOne({
      where: { id },
    });

    return user;
  }

  static async findByEmail(email: string) {
    const user = await userRepository.findOne({
      where: { email },
    });

    return user;
  }
}
