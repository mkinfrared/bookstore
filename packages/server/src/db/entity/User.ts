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
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("varchar", { length: 255 })
  username: string;

  @Column("text")
  password: string;

  @BeforeInsert()
  addID() {
    this.id = uuidv4();
  }
}
