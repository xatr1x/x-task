import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Problem } from './Problem';
import { Type } from './Type';
import { Details } from './Details';

@Entity()
export class Solution {
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
  description: string;

  @Column()
  comment: string;

  @ManyToOne(() => Problem, problem => problem.solutions)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @ManyToOne(() => Type, (type) => type.brands)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Details, details => details.solutions)
  @JoinColumn({ name: 'details_id' })
  details: Details;
}
