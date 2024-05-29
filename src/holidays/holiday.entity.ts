import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ibgeCode: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;
}
