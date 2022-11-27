import { CreateNewsDto, NewsCreate } from '../../news/dto/create-news.dto';
import { CreateCommentDto } from '../../news/comments/dto/create-comment.dto';

export function renderAllNews(news: NewsCreate): string {
  let newsList: string = '';
  for (const newsItem in news) {
    newsList += renderNewsBlock(news[newsItem]);
  }
  return `<h1>Список новостей</h1>
<div class="row">
${newsList}
</div>`;
}

export function renderNewsBlock(news: CreateNewsDto): string {
  return `<div class="col-lg-3 mb-2">
<div class="card">
  <img src="${news.cover}" class="card-img-top" alt="cat">
  <div class="card-body">
    <h3 class="card-title">${news.title}</h3>
    <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
    <p class="card-text">${news.description}</p>
  </div>
</div>
</div>`;
}

export function renderCommentsAll(newsId: number, comments: Array<CreateCommentDto>, isReply): string {
  let commentsList: string = '';
  for (const item of comments) {
    commentsList += renderCommentsBlock(newsId, item, isReply);
  }
  return `${!isReply ? '<h5 class="card-title mb-2">Список комментариев</h5>' : ''}
<div class="comments-block">
${commentsList}
</div>`;
}

export function renderCommentsBlock(newsId: number, comment: CreateCommentDto, isReply): string {
  return `<div class="comment mb-2">
   <div class="d-flex flex-wrap">
    <div class="mb-2 me-4 rounded-circle bg-success bg-opacity-10 border-0" style="width:65px; height:65px; overflow: hidden;">
    <img src="${comment.cover?comment.cover:'https://termosfera.su/wp-content/uploads/2022/04/2816616767_vubrbej.jpg'}" alt="" style="height:100%;">
    </div>
    <div>
    <h6 class="card-subtitle mb-2 text-muted">${comment.author}</h6>
    <p class="card-text">${comment.message}</p>
    </div>
    </div>
    <div class="reply-comments">${comment?.reply ? renderCommentsAll(newsId, comment?.reply, true) : ''}</div>
   ${!isReply ? generateForm(newsId, comment.id) : ''}
  </div>`;
}

export function renderNewsDetail(newsId: number, news: CreateNewsDto): string {
  let newsItem: string = '<div class="row">';
  newsItem += `<div class="col-lg-6 mx-auto">
  <div class="card">
  <img src="${news.cover}" class="card-img-top" alt="cat">
  <div class="card-body">
  <h5 class="card-title">${news.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
    <p class="card-text">${news.description}</p>
    <div>${news?.comments?.length > 0 ? renderCommentsAll(newsId, news.comments, false) : 'Комментариев нет'}</div>
    </div>
    </div>
    </div>`;

  return `<h1 class="text-center mb-3">Детальная страница новости</h1>
<div class="row">
${newsItem}
</div>`;
}

export function generateForm(newsId, commentId) {
  return `
  <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe"></iframe> 
  <form class="upload-form" method="post" enctype="application/x-www-form-urlencoded" target="dummyframe" 
  action="https://gb-nest-app.herokuapp.com/comments/${newsId}/${commentId}"> 
  <p>Ответить на комментарий:</p> 
    <input type="text" class="form-control mb-2" name="author" placeholder="Автор">
   <textarea name="message" class="form-control mb-3" placeholder="Сообщение"></textarea> 
   <button type="submit" class="btn btn-outline-secondary">Отправить</button> 
   </form>
  `;
}