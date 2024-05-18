import User from "../models/user";
import UserInterface from "../models/user.interface";

export default interface UserRepositoryInterface {
  create: (user: Omit<UserInterface, `id`>) => Promise<User>;
  update: (user: User, userData: Partial<Omit<UserInterface, `id`>>) => Promise<User>;
  findUserById: (id: number) => Promise<User | null>;
  findUserByEmail: (email: string) => Promise<User | null>;
}
