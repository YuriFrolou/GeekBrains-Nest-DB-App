import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { password } from './password';
import {join} from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({imports: [
    MailerModule.forRoot({
      transport: `smtps://yf_dev_test@mail.ru:${password}@smtp.mail.ru`,
      defaults: {
        from: '"Yuriy" <yf_dev_test@mail.ru>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports:[MailService]
})
export class MailModule {}
