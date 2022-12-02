import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './entities/news.entity';
import { CommentsEntity } from './comments/entities/comments.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsService } from './comments/comments.service';
import { CategoriesService } from './categories/categories.service';
import { CategoriesEntity } from './categories/entities/category.entity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [MailModule,UsersModule,CategoriesModule,CommentsModule,
    TypeOrmModule.forFeature([NewsEntity,CommentsEntity,UsersEntity,CategoriesEntity])
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports:[NewsService]
})
export class NewsModule {}
