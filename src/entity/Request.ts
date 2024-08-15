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
import { Type } from './Type';
import { Brand } from './Brand';
import { Model } from './Model';
import { Problem } from './Problem';
import { IsBoolean } from 'class-validator';

@Entity()
export class Request {
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

  @ManyToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Model)
  @JoinColumn({ name: 'model_id' })
  model: Model;

  @OneToMany(() => Problem, problem => problem.request, { cascade: true })
  problems: Problem[];

  @IsBoolean()
  @Column({
    default: true
  })
  isActive: boolean
}
