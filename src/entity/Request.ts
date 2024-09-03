import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Problem } from './Problem';
import { Type } from './Type';
import { Brand } from './Brand';
import { Model } from './Model';
import { RequestProblemDetails } from './RequestProblemDetails';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;

  @ManyToOne(() => Type)
  type: Type;

  @ManyToOne(() => Brand)
  brand: Brand;

  @ManyToOne(() => Model)
  model: Model;

  @ManyToMany(() => Problem)
  @JoinTable({
    name: 'request_problems',
    joinColumn: { name: 'request_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'problem_id', referencedColumnName: 'id' },
  })
  problems: Problem[];

  @OneToMany(() => RequestProblemDetails, (rpd) => rpd.request)
  requestProblemDetails: RequestProblemDetails[];
}
