import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from "typeorm";

import { User } from ".";

@Entity(`users_sessions`)
export class UserSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  session: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user: User) => user.sessions)
  @JoinColumn({ name: `userId`, referencedColumnName: `id` })
  user?: Relation<User>;

  @Column()
  userAgent: string;

  @Column()
  ip: string;

  @Column({ default: false })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
