import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  type: 'income' | 'expense'; // Para diferenciar entre ingreso y gasto

  @Column()
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}