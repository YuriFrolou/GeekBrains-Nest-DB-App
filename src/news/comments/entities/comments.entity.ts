import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UsersEntity } from '../../../users/entities/users.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { NewsEntity } from '../../entities/news.entity';

@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  message: string;

  @Column('text')
  cover?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.comments)
  user: UsersEntity;
  @ManyToOne(() => NewsEntity, (news) => news.comments)
  news: NewsEntity;

}

