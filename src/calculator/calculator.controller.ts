import {Body, Controller, Get, Param, Patch, Put, Query, Req, Res} from '@nestjs/common';
import {CalculatorService} from "./calculator.service";
import Request from "express";
import {ApiHeader, ApiHeaders, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CalcDataDto} from "../news/dto/calc-data.dto";
import {ApiImplicitParam} from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";
import {ApiImplicitHeader} from "@nestjs/swagger/dist/decorators/api-implicit-header.decorator";

@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) {
    }

    @Patch()
    @ApiTags('calculator:plus/minus/multiply')
    @ApiResponse({
        status:200,
        description:'get arithmetic result'
    })
    @ApiImplicitHeader({name:'custom-type-operation',required:false})
    calculate(@Query() query: CalcDataDto, @Req() request: Request): number | string {
        const func = request.headers['custom-type-operation'];
        if (func) {
            return this.calculatorService.calculate(func, +query.x, +query.y);
        }

        return 'Отсутствуют данные о типе операции';

    }

    @Put()
    @ApiTags('calculator:plus/minus/multiply')
    @ApiResponse({
        status:200,
        description:'get arithmetic result'
    })
    @ApiImplicitHeader({name:'custom-type-operation',required:false})
    calculate2(@Body() body: CalcDataDto, @Req() request: Request): number | string {
        const func = request.headers['custom-type-operation'];
        if (func) {
            return this.calculatorService.calculate(func, body.x, body.y);
        }

        return 'Отсутствуют данные о типе операции';

    }
}
