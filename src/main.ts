import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressHbs from 'express-handlebars';
import * as hbs from 'hbs';


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets (join(process.cwd(), 'public'));
    app.setBaseViewsDir(join(process.cwd(), 'views'));
    app.setViewEngine('hbs');

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }));
    const config = new DocumentBuilder()
        .setTitle('News API')
        .setDescription('The news API description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.engine(
      'hbs',
      expressHbs.engine({
          layoutsDir: join(process.cwd(), 'views/layouts'),
          defaultLayout: 'layout',
          extname: 'hbs',
      }),
    );
    hbs.registerPartials(process.cwd() + '/views/partials');

    const hbsHelper = require('handlebars');

    hbsHelper.registerHelper('equal', function(context1,context2) {
        if(context1===context2){
            return context1;
        }else{
            return 'Было:'+'<s>'+ context1+'</s>'+' Стало: '+context2;
        }
    });

    hbsHelper.registerHelper('ternOperator', function(value:any,content:string) {
        return value?value:content;
    });

    hbsHelper.registerHelper('url', function(path:string,param1:number,param2:number) {
        return `${path}/${param1}/${param2}`;
    });

    app.setViewEngine('hbs');
    await app.listen(process.env.PORT ||3000);
}

bootstrap();
