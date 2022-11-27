import {IsNumberString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CalcDataDto {
    @ApiProperty()
    @IsNumberString()
    x: number;

    @ApiProperty()
    @IsNumberString()
    y: number;
}
