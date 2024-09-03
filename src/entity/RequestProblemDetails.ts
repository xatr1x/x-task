import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Request } from './Request';
import { Problem } from './Problem';
import { Details } from './Details';

@Entity()
export class RequestProblemDetails {
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

  @ManyToOne(() => Request)
  request: Request;

  @ManyToOne(() => Problem)
  problem: Problem;

  @ManyToOne(() => Details)
  details: Details;
}
