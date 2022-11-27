import { v4 as uuidv4 } from 'uuid';
import {Request} from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

const publicPath = './public';
let path: string = publicPath;

export class HelperFileLoad {
  static set path(_path) {
    path = publicPath + _path;
  }

  public static customFileName(req: Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      return cb(
        new HttpException(
          'Загружаемый файл должен быть изображением',
          HttpStatus.BAD_REQUEST,
        ),
        '',
      );
    }
    const originalName = file.originalname;
    const fileExtension = originalName.split('.').slice(-1);
    cb(null, `${uuidv4()}.${fileExtension}`);
  }


  public static destinationPath(req: Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
    cb(null, path);
  }
}