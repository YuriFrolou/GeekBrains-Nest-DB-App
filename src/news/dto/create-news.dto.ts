import {IsArray, IsInt, IsOptional, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

export class CreateNewsDto {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id?: number;

    @ApiProperty({type:String})
    @IsString()
    title: string;

    @ApiProperty({type:String})
    @IsString({
        message:'Поле description должно быть строкой'
    })
    description: string;

    @ApiProperty({type:String})
    @IsString()
    author: string;

    @ApiPropertyOptional({type:Number})
    @IsInt()
    @IsOptional()
    countView?: number;

    @ApiPropertyOptional({type:String})
    @IsString()
    @IsOptional()
    cover?: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    comments?: CreateCommentDto[];
}

export type NewsCreate=Record<string|number,CreateNewsDto>;