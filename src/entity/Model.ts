import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Brand } from './Brand';
import { Type } from './Type';

@Entity()
export class Model {
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

  @ManyToOne(() => Type, type => type.id)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Brand, brand => brand.id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}