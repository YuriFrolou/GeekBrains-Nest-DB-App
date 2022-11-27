import {IsString} from "class-validator";
import {ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto {

  @ApiPropertyOptional({type: String})
  @IsString({
    message: 'Поле message должно быть строкой'
  })
  message: string;
}
