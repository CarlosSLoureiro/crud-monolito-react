import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

import { RefreshToken } from "./refreshToken";

@Entity(`users`)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  picture?: string;

  @OneToMany(() => RefreshToken, (refreshToken: RefreshToken) => refreshToken.user)
  @JoinColumn({ name: `id`, referencedColumnName: `userId` })
  refreshTokens?: Relation<RefreshToken>[];
}
