import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Brand } from './Brand';
import { Model } from './Model';
import { Problem } from './Problem';
import { Details } from './Details';
import { Solution } from './Solution';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @Column()
  name: string;

  @OneToMany(() => Brand, (brand) => brand.type, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  brands: Brand[];

  @OneToMany(() => Model, (model) => model.type)
  models: Model[];

  @OneToMany(() => Problem, (problem) => problem.type)
  problems: Problem[];

  @OneToMany(() => Details, (detail) => detail.type)
  details: Details[];

  @OneToMany(() => Solution, (solution) => solution.type)
  solutions: Solution[];
}
