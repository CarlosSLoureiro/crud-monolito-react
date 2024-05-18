import type UserRepositoryInterface from "./user.interface";
import User from "../models/user";
import UserInterface from "../models/user.interface";

export default class UserRepository implements UserRepositoryInterface {
  public async create(userData: Omit<UserInterface, `id`>): Promise<User> {
    try {
      return await User.create(userData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async update(user: User, userData: Partial<Omit<UserInterface, `id`>>): Promise<User> {
    try {
      return await user.update(userData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findUserById(id: number): Promise<User | null> {
    try {
      return await User.findOne({ where: { id } });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { email } });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
