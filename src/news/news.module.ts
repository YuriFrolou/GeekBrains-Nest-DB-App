import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [CommentsModule,MailModule],
  exports:[NewsService]
})
export class NewsModule {}
