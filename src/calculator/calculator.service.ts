import {Injectable} from '@nestjs/common';

@Injectable()
export class CalculatorService {
    calculate(func: string, param1: number, param2: number) {
        switch (func) {
            case 'plus':
                return param1 + param2;
            case 'minus':
                return param1 - param2;
            case 'multiply':
                return param1 * param2;
            default:
                return 'Не удалось выполнить операцию. Проверьте параметры запроса';
        }

    }
}
