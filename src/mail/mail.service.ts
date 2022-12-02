import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateNewsDto } from '../news/dto/create-news.dto';
import { NewsEntity } from '../news/entities/news.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async sendTest() {
    console.log('Отправляется тестовое письмо');
    try {
      return await this.mailerService.sendMail({
        to: 'yf_dev_test@mail.ru',
        subject: 'Тестовое письмо',
        template: './test',
      });
    } catch (error) {
      console.log(error);
    }
  }

  updateNewsLogMessage(addressTo: string, array:NewsEntity[]) {
    console.log(array);
    return this.mailerService
      .sendMail({
        to: addressTo,
        subject: 'Обновление данных!',
        template: './update',
        context: {
          news:array[0],
          updatedNews:array[1]
        }
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
