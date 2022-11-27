import { Injectable } from '@nestjs/common';
import { Comments, CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { getRandomInt } from '../../utils/helpers';

@Injectable()
export class CommentsService {

  private readonly comments: Comments = {
    1: [{
      id: 123,
      message: 'Ура! Наш первый комментарий',
      author: 'Маша',
      cover:'https://otkritkis.com/wp-content/uploads/2022/06/pwwhk.jpg',
      reply:[],
      newsId:1
    }],
  };

  addNewsId(id:number){
    this.comments[id]=[];
  }

  create(newsId: number, comment: CreateCommentDto,commentId:number|undefined=undefined): CreateCommentDto[] | CreateCommentDto|string {
    const generatedId = getRandomInt(1, 10000);
    if(commentId){
      const parentComment=this.comments[newsId].find(comment => comment.id === commentId);
      if (parentComment) {
        this.comments[newsId][this.comments[newsId].indexOf(parentComment)]['reply']?.push({...comment,id:generatedId});
        return this.findOne(newsId,commentId);
      }
    }
    if (Object.keys(this.comments).indexOf(String(newsId)) !== -1) {
      this.comments[newsId]?.push({...comment,id:generatedId,reply:[],newsId:newsId});
      return this.comments[newsId];
    }

    return 'Не удалось добавить комментарий';
  }


  findAll(newsId: string | number): CreateCommentDto[]|[] {
    return this.comments[newsId]?this.comments[newsId]:[];
  }

  findOne(newsId: number, commentId: number): CreateCommentDto | string {
    if (!this.comments[newsId]) {
      return 'Новость с данным id не найдена';
    }
    const comment = this.comments[newsId].find(comment => comment.id === commentId);
    if (!comment) {
      return 'Комментарий не найден';
    }
    return comment;
  }

  update(newsId: number, commentId: number, updateCommentDto: UpdateCommentDto): boolean {
    if (!this.comments[newsId]) {
      return false;
    }
    let comment = this.comments[newsId].find(comment => comment.id === commentId);
    if (!comment) {
      return false;
    }
    this.comments[newsId][this.comments[newsId].indexOf(comment)] = {
      ...comment,
      ...updateCommentDto,
    };
    return true;
  }


  remove(newsId: number, commentId: number): boolean {

    if (!this.comments[newsId]) {
      return false;
    }
    let comment = this.comments[newsId].find(comment => comment.id === commentId);
    if (!comment) {
      return false;
    }
    this.comments[newsId].splice(this.comments[newsId].indexOf(comment), 1);
    return true;

  }
}
