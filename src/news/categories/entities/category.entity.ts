import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NewsEntity } from '../../entities/news.entity';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  name: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @OneToMany(() => NewsEntity, (news) => news.category)
  news: NewsEntity[];
}

