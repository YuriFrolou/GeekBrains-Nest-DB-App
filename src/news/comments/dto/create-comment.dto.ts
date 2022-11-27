import { IsArray, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateCommentDto {

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id?: number;

    @ApiProperty({type: String})
    @IsString({
        message: 'Поле message должно быть строкой'
    })
    @IsNotEmpty()
    message: string;

    @ApiProperty({type: String})
    @IsString()
    author: string;

    @ApiPropertyOptional({type:String})
    @IsString()
    @IsOptional()
    cover?: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    reply?: CreateCommentDto[];

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    newsId?: number;
}

export type Comments = Record<string | number, CreateCommentDto[]>;