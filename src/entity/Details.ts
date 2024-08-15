import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Problem } from './Problem';
import { Type } from './Type';
import { Solution } from './Solution';

@Entity()
export class Details {
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

  @ManyToOne(() => Problem, problem => problem.details)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @ManyToOne(() => Type, (type) => type.brands)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToMany(() => Solution, solution => solution.details, { cascade: true, onDelete: 'CASCADE' })
  solutions: Solution[];
}
