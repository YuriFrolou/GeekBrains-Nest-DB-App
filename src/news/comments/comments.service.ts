import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsService } from '../news.service';
import { CommentsEntity } from './entities/comments.entity';
import { UsersService } from '../../users/users.service';


@Injectable()
export class CommentsService {

  constructor(@InjectRepository(CommentsEntity)
              private readonly commentRepository: Repository<CommentsEntity>,
              @Inject(forwardRef(() => NewsService))
              private readonly newsService: NewsService,
              private readonly usersService: UsersService,
  ) {
  }

  async create(createCommentDto: CreateCommentDto):Promise<CommentsEntity> {
    const _news = await this.newsService.findOneById(createCommentDto.newsId);
    const _user = await this.usersService.getUserById(createCommentDto.userId);

    if (!_user) {
      throw new HttpException(
        'Не существует такого автора', HttpStatus.BAD_REQUEST,
      );
    }
    if (!_news) {
      throw new HttpException(
        'Не существует такой новости', HttpStatus.BAD_REQUEST,
      );
    }

    const comment = new CommentsEntity();
    comment.message = createCommentDto.message;
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
    comment.cover = createCommentDto.cover;
    comment.user = _user;
    comment.news = _news;

    return await this.commentRepository.save(comment);

  }


  async findAll(newsId: number):Promise<CommentsEntity[]> {
    return await this.commentRepository.find({
      where: {
        news: {
          id: newsId,
        },
      },
    });
  }

  async findAllWithUsers(newsId: number):Promise<CommentsEntity[]> {
    return await this.commentRepository.find({
      where: {
        news: {
          id: newsId,
        },
      },
      relations: ['user'],
      join: {
        alias: 'comments',
        leftJoinAndSelect: {
          user: 'comments.user',
        },
      },
    });
  }

  async findOne(newsId: number, commentId: number):Promise<CommentsEntity>  {
    const news = await this.newsService.findOneById(newsId);
    const comment = await this.commentRepository.findOneBy({id:commentId});
    if (!news || !comment) {
      throw new NotFoundException();
    }

    return comment;
  }

  async update(newsId: number, commentId: number, updateCommentDto: UpdateCommentDto):Promise<CommentsEntity>  {
    const comment=await this.findOne(newsId,commentId);
    const updatedComment = {
      ...comment,
      message: updateCommentDto.message ? updateCommentDto.message : comment.message,
      updatedAt: new Date()
    };
    await this.commentRepository.save(updatedComment);
    return this.commentRepository.findOneBy({id:commentId})
  }


  async remove(newsId: number, commentId: number):Promise<CommentsEntity[]> {
    const comment=await this.findOne(newsId,commentId);
    await this.commentRepository.remove(comment);
    return await this.findAll(newsId);
  }
}
