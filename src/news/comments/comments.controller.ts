import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from '../../utils/HelperFileLoad';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Post('/:newsId')
  @ApiTags('comments')
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'create new comment',
    type: [CreateCommentDto],
  })
  @UseInterceptors(FileInterceptor('cover', {
    storage: diskStorage({
      destination: HelperFileLoad.destinationPath,
      filename: HelperFileLoad.customFileName,
    }),
  }))
  create(@Param('newsId') newsId: number, @Body() createCommentDto: CreateCommentDto, @UploadedFile()cover: Express.Multer.File) {
    console.log(cover);
    if (cover?.filename) {
      createCommentDto.cover = PATH_NEWS + cover.filename;
    } else {
      createCommentDto.cover = 'https://termosfera.su/wp-content/uploads/2022/04/2816616767_vubrbej.jpg';
    }
    return this.commentsService.create(newsId, createCommentDto);
  }

  @Post('/:newsId/:commentId')
  @ApiTags('comments')
  @ApiBody({ type: [CreateCommentDto] })
  @ApiResponse({
    status: 201,
    description: 'create reply to comment',
    type: [CreateCommentDto],
  })
  createReplyToComment(@Param('newsId') newsId: number, @Param('commentId') commentId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(newsId, createCommentDto, commentId);
  }


  @Get('/:newsId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'get all comments by news id',
    type: [CreateCommentDto],
  })
  findAll(@Param('newsId') newsId: number) {
    return this.commentsService.findAll(newsId);

  }


  @Get('/all/:newsId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'render all comments by news id'
  })
  @Render('comments-list')
  renderAll(@Param('newsId') newsId: number) {
    const comments= this.commentsService.findAll(newsId);
    return {
      comments:comments
    }

  }

  @Get('/:newsId/:commentId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'get comment by newsId and commentId',
    type: CreateCommentDto,
  })
  findOne(@Param('newsId') newsId: number, @Param('commentId') commentId: number): CreateCommentDto | string {
    return this.commentsService.findOne(newsId, commentId);
  }

  @Patch('/:newsId/:commentId')
  @ApiTags('comments')
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'update comment',
    type: 'Комментарий успешно обновлен',
  })
  @ApiResponse({
    status: 500,
    description: 'incorrect id',
    type: 'Проверьте правильность вводимых данных',
  })
  update(@Param('newsId') newsId: number, @Param('commentId') commentId: number, @Body() updateCommentDto: UpdateCommentDto, @Res() response: Response) {
    const res = this.commentsService.update(newsId, commentId, updateCommentDto);
    if (res) {
      return response.status(200).send(' Комментарий успешно обновлен');
    }
    return response.status(500).send('Не удалось обновить комментарий');

  }

  @Delete('/:newsId/:commentId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'delete comment',
    type: 'is successful',
  })
  remove(@Param('newsId') newsId: number, @Param('commentId') commentId: number): string {
    const isRemoved = this.commentsService.remove(newsId, commentId);
    return isRemoved ? 'Комментарий успешно удален' : 'Не удалось удалить комментарий';
  }
}
