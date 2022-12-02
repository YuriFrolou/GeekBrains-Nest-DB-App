import { IsArray, IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

export class CreateNewsDto {

    @ApiProperty({type:String})
    @IsString()
    title: string;

    @ApiProperty({type:String})
    @IsString({
        message:'Поле description должно быть строкой'
    })
    description: string;

    @ApiPropertyOptional({type:String})
    @IsString()
    @IsOptional()
    cover?: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    comments?: CreateCommentDto[];

    @ApiProperty({type:Number})
    @IsNumberString()
    userId: number;

    @ApiProperty({type:Number})
    @IsNumberString()
    categoryId: number;
}

export type NewsCreate=Record<string|number,CreateNewsDto>;