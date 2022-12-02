import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from '../../utils/HelperFileLoad';
import { CommentsEntity } from './entities/comments.entity';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Post()
  @ApiTags('comments')
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'create new comment',
    type:CommentsEntity
  })
  @UseInterceptors(FileInterceptor('cover', {
    storage: diskStorage({
      destination: HelperFileLoad.destinationPath,
      filename: HelperFileLoad.customFileName,
    }),
  }))
  async create(@Body() createCommentDto: CreateCommentDto, @UploadedFile()cover: Express.Multer.File):Promise<CommentsEntity>{

    if (cover?.filename) {
      createCommentDto.cover = PATH_NEWS + cover.filename;
    } else {
      createCommentDto.cover = 'https://termosfera.su/wp-content/uploads/2022/04/2816616767_vubrbej.jpg';
    }
    return await this.commentsService.create(createCommentDto);

  }


  @Get('/:newsId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'get all comments by news id',
    type:[CommentsEntity]
  })
  async findAll(@Param('newsId') newsId: number):Promise<CommentsEntity[]> {
    return this.commentsService.findAll(newsId);

  }


  @Get('/all/:newsId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'render all comments by news id'
  })
  @Render('comments-list')
 async renderAll(@Param('newsId') newsId: number):Promise<Object> {
    const comments= await this.commentsService.findAllWithUsers(newsId);
    return {
      comments:comments
    }

  }

  @Get('/:newsId/:commentId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'get comment by newsId and commentId',
    type: CommentsEntity,
  })
  async findOne(@Param('newsId') newsId: number, @Param('commentId') commentId: number):Promise<CommentsEntity> {
    return await this.commentsService.findOne(newsId, commentId);
  }

  @Patch('/:newsId/:commentId')
  @ApiTags('comments')
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'update comment',
    type:CommentsEntity
  })
  async update(@Param('newsId') newsId: number, @Param('commentId') commentId: number, @Body() updateCommentDto: UpdateCommentDto):Promise<CommentsEntity> {
    return await this.commentsService.update(newsId, commentId, updateCommentDto);
  }

  @Delete('/:newsId/:commentId')
  @ApiTags('comments')
  @ApiResponse({
    status: 200,
    description: 'delete comment',
    type: [CommentsEntity]
  })
  async remove(@Param('newsId') newsId: number, @Param('commentId') commentId: number):Promise<CommentsEntity[]> {
    return await this.commentsService.remove(newsId, commentId);
  }
}
