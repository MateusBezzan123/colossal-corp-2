import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Municipality {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;
}
