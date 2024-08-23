import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Request } from './Request';
import { Details } from './Details';
import { Solution } from './Solution';
import { Type } from './Type';

@Entity()
export class Problem {
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

  @ManyToOne(() => Type)
  type: Type;

  @ManyToMany(() => Details)
  @JoinTable({
    name: 'problem_details',
    joinColumn: { name: 'problem_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'details_id', referencedColumnName: 'id' },
  })
  details: Details[];

  @ManyToMany(() => Solution)
  @JoinTable({
    name: 'problem_solutions',
    joinColumn: { name: 'problem_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'solution_id', referencedColumnName: 'id' },
  })
  solutions: Solution[];
}
