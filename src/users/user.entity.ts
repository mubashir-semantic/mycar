import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed user with id: ${this.id}`);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
