import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shares')
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  noteId: number;

  @Column()
  userId: number;

  @Column()
  expiresAt: Date;
}