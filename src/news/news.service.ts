import {HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto} from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { MailService } from '../mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './entities/news.entity';
import { UsersService } from '../users/users.service';
import { CategoriesService } from './categories/categories.service';

@Injectable()
export class NewsService {

  constructor(@InjectRepository(NewsEntity) private readonly newsRepository: Repository<NewsEntity>,
               private readonly mailService: MailService,
               private readonly usersService: UsersService,
               private readonly categoriesService: CategoriesService,

  ) {
  }

  async createNews(createNewsDto: CreateNewsDto):Promise<NewsEntity> {
    const _user = await this.usersService.getUserById(createNewsDto.userId);
    const _category = await this.categoriesService.findOne(createNewsDto.categoryId);
    if (!_user) {
      throw new HttpException(
        'Не существует такого автора', HttpStatus.BAD_REQUEST,
      );
    }
    if (!_category) {
      throw new HttpException(
        'Не существует такой категории', HttpStatus.BAD_REQUEST,
      );
    }
    const newsEntity = new NewsEntity();
    newsEntity.title = createNewsDto.title;
    newsEntity.description = createNewsDto.description;
    newsEntity.createdAt = new Date();
    newsEntity.updatedAt = new Date();
    newsEntity.cover = createNewsDto.cover;
    newsEntity.user = _user;
    newsEntity.category = _category;

    return await this.newsRepository.save(newsEntity);
  }

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find();
  }

  async findAllByUser(userId: number):Promise<NewsEntity[]> {
    return await this.newsRepository.find({
      where: {
        user: {
          id: userId,
        },
      }
    });
  }

  async findOneById(id: number):Promise<NewsEntity> {
    const news = await this.newsRepository.findOne({
      where: {
        id,
      },
      relations: ['comments','user'],
      join: {
        alias: 'news',
        leftJoinAndSelect: {
          comments: 'news.comments',
          user:'news.user'
        },
      },
    });

    if (!news) {
      throw new NotFoundException();
    }
    return news;
  }


  async update(id: number, updateNewsDto: UpdateNewsDto):Promise<NewsEntity> {
    const news = await this.newsRepository.findOne({
      where: {
        id,
      },
    });

    if (!news) {
      throw new NotFoundException();
    }
    const updatedNews = {
      ...news,
      title: updateNewsDto.title ? updateNewsDto.title : news.title,
      description: updateNewsDto.description ? updateNewsDto.description : news.description,
      updatedAt: new Date()
    };
    await this.newsRepository.save(updatedNews);
    await this.mailService.updateNewsLogMessage('yf_dev_test@mail.ru', [news, updatedNews]);
    return updatedNews;
  }


  async remove(id: number):Promise<NewsEntity[]> {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException();
    }
    await this.newsRepository.remove(news);
    return await this.newsRepository.find();
  }
}
