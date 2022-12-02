import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { CalculatorModule } from './calculator/calculator.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path' ;
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommentsEntity } from './news/comments/entities/comments.entity';
import { NewsEntity } from './news/entities/news.entity';
import { UsersEntity } from './users/entities/users.entity';
import { CategoriesEntity } from './news/categories/entities/category.entity';
import { CommentsModule } from './news/comments/comments.module';
import { CategoriesModule } from './news/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: +process.env.TYPEORM_PORT,
      logging: true,
      migrationsRun: true,
      synchronize: true,
      entities: [UsersEntity,NewsEntity,CommentsEntity,CategoriesEntity],
    }),
    UsersModule,MailModule,NewsModule,CategoriesModule,CommentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
