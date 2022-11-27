import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  Render,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CommentsService } from './comments/comments.service';
import { renderAllNews, renderNewsDetail } from '../view/news/news';
import { renderTemplate } from '../view/template';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from '../utils/HelperFileLoad';


const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService,
              private readonly commentsService: CommentsService) {
  }

  @Post()
  @ApiTags('news')
  @ApiBody({ type: CreateNewsDto })
  @ApiResponse({
    status: 201,
    description: 'create new news',
    type: [CreateNewsDto],
  })
  @UseInterceptors(FileInterceptor('cover', {
    storage: diskStorage({
      destination: HelperFileLoad.destinationPath,
      filename: HelperFileLoad.customFileName,
    }),
  }))
  create(@Body() createNewsDto: CreateNewsDto, @UploadedFile()cover: Express.Multer.File) {
    if (cover?.filename) {
      createNewsDto.cover = PATH_NEWS + cover.filename;
    }
    return this.newsService.create(createNewsDto);
  }


  @Get('all')
  @ApiTags('news')
  @ApiResponse({
    status: 200,
    description: 'render all news',
  })
  @Render('news-list')
  renderAllNews() {
    const news = this.newsService.findAll();
    return {
      news: news,
      seo:{
        title: 'Список новостей',
        description: 'Самые крутые новости'
      },
    };
  }


  @Get('/detail/:id')
  @ApiTags('news')
  @ApiResponse({
    status: 200,
    description: 'render news by id',
  })
  @Render('news-detail')
  renderOneNews(@Param('id')id: number) {
    const news = this.newsService.findOne(id);
    const comments = this.commentsService.findAll(id);

    return {
      news: {
        ...news,
        comments: comments.length > 0 ? comments : []
      },
      seo:{
        title: 'Детальная страница новости',
        description: 'Самая крутая новость'
      },
    };
     }

  @Get()
  @ApiTags('news')
  @ApiResponse({
    status: 200,
    description: 'get all news',
    type: [CreateNewsDto],
  })
  findAll(@Res() response: Response) {
    const res = this.newsService.findAll();
    if (res) {
      return response.status(200).send(res);
    }
    return response.status(500).send('Что-то пошло не так. Попробуйте повторить запрос');
  }

  @Get(':id')
  @ApiTags('news')
  @ApiResponse({
    status: 200,
    description: 'get news by id',
    type: CreateNewsDto,
  })
  findOne(@Param('id') id: number): Object {
    const comments = this.commentsService.findAll(id);
    return {
      ...this.newsService.findOne(id),
      comments: comments.length > 0 ? comments : [],
    };
  }

  @Patch(':id')
  @ApiTags('news')
  @ApiBody({ type: UpdateNewsDto })
  @ApiResponse({
    status: 200,
    description: 'update news',
    type: 'Новость успешно обновлена',
  })
  @ApiResponse({
    status: 500,
    description: 'incorrect id',
    type: 'По передаваемому ID новость не найдена',
  })
  update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto, @Res() response: Response) {
    const res = this.newsService.update(id, updateNewsDto);
    if (res) {
      return response.status(200).send('Новость успешно обновлена');
    }
    return response.status(500).send('По передаваемому ID новость не найдена');

  }

  @Delete(':id')
  @ApiTags('news')
  @ApiResponse({
    status: 200,
    description: 'delete news by id',
    type: 'is successful',
  })
  remove(@Param('id') id: number): string {
    const isRemoved = this.newsService.remove(id);
    return isRemoved ? 'Новость успешно удалена' : 'Новость не найдена';
  }
}
