import {Injectable} from '@nestjs/common';
import {CreateNewsDto, NewsCreate} from './dto/create-news.dto';
import {UpdateNewsDto} from './dto/update-news.dto';
import {getRandomInt} from "../utils/helpers";
import { CommentsService } from './comments/comments.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NewsService {

    private readonly news:NewsCreate= {
        1: {
            id:1,
            title: "Первая новость",
            description: "Ура! Наша первая новость",
            author: "Владислав",
            countView: 12,
            cover:"https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg"
        }
    };
    constructor(private readonly commentsService: CommentsService,private readonly mailService: MailService) {
    }
    create(createNewsDto: CreateNewsDto): NewsCreate {
        const newId = getRandomInt(1, 10000);
        this.news[newId]={
            id:newId,
            ...createNewsDto
        };
        this.commentsService.addNewsId(newId);
        return this.news;
    }

    findAll(): NewsCreate {
        return this.news;
    }

    findOne(id: number): CreateNewsDto | undefined {
        return this.news[id];
    }

    async update(id: number, updateNewsDto: UpdateNewsDto) {
        const indexUpdateNews = id in this.news;
        let previousNews=null;
        if (indexUpdateNews) {
            previousNews=this.news[id];
            this.news[id] = {
                ...this.news[id],
                ...updateNewsDto
            };
            await this.mailService.updateNewsLogMessage('yf_dev_test@mail.ru', [previousNews,this.news[id]]);
            return true;
        }
        return false;
    }

    remove(id: number): boolean {
        const indexRemoveNews = id in this.news;
        if (indexRemoveNews) {
           delete this.news[id];
            return true;
        }
        return false;
    }
}
