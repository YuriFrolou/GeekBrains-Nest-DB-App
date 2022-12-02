import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NewsEntity } from '../../news/entities/news.entity';
import { CommentsEntity } from '../../news/comments/entities/comments.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text')
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => NewsEntity, (news) => news.user)
  news: NewsEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];
}