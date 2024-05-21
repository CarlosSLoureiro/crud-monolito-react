import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

import { UserSession } from "./userSession";

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

  @OneToMany(() => UserSession, (userSession: UserSession) => userSession.user)
  @JoinColumn({ name: `id`, referencedColumnName: `userId` })
  sessions?: Relation<UserSession>[];
}
