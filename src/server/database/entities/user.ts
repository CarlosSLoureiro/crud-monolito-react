import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(`users`)
export default class User {
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
}
