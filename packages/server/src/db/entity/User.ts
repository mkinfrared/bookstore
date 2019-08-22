import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("uuid", { unique: true })
  id: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("varchar", { length: 255, unique: true })
  username: string;

  @Column("text")
  password: string;

  @BeforeInsert()
  addID() {
    this.id = uuidv4();
  }
}
