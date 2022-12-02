import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../news/entities/news.entity';
import { CommentsEntity } from '../news/comments/entities/comments.entity';
import { UsersEntity } from './entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NewsEntity, CommentsEntity,UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
