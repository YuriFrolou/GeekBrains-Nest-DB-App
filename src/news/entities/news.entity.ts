import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../categories/entities/category.entity';
import { CommentsEntity } from '../comments/entities/comments.entity';

@Entity('news')
  export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  @Column('text', { nullable: true })
  cover: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @ManyToOne(() => UsersEntity, (user) => user.news)
  user: UsersEntity;
  @ManyToOne(() => CategoriesEntity, (category) => category.news)
  category: CategoriesEntity;
  @OneToMany(() => CommentsEntity, (comments) => comments.news)
  comments: CommentsEntity[];
}
