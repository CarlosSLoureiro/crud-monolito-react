import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

import { User } from "./user";

@Entity(`refreshTokens`)
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expirationDate: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user: User) => user.refreshTokens)
  @JoinColumn({ name: `userId`, referencedColumnName: `id` })
  user?: Relation<User>;
}
