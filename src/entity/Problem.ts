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
import { Solution } from './Solution';
import { Request } from './Request';
import { Details } from './Details';
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

  @ManyToOne(() => Request, request => request.problems)
  @JoinColumn({ name: 'request_id' })
  request: Request;

  @OneToMany(() => Solution, solution => solution.problem, { cascade: true })
  solutions: Solution[];

  @OneToMany(() => Details, details => details.problem, { cascade: true })
  details: Details[];

  @ManyToOne(() => Type, (type) => type.brands)
  @JoinColumn({ name: 'type_id' })
  type: Type;
}
