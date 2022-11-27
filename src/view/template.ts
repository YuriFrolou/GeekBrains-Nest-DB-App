export type SEO = {
  title: string,
  description: string
}
export const renderTemplate = (content: string, seo: SEO) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${seo.title}</title>
    ${seo.description ? `<meta name="description" content='${seo.description}'/>` : ''}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
  <style>
  img{
  display: block;
  width: 100%;
  object-fit: cover;
  }
  .card{
  min-height: 450px;
  box-shadow: 2px 2px 7px rgba(128,128,128,0.8);
  }
  .card img{
  height: 300px;
  }
  .comment{
  border-bottom: 1px solid darkgray;
  padding-bottom: 5px;
  margin-top: 15px;
  }
.comments-block{
  box-shadow: inset 0 0 3px rgba(0,0,0,0.6);
  padding: 4px;
}
</style>
  </head>
  <body>
    ${content}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
  </body>
</html>
`;
};