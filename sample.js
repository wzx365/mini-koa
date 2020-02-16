const Koa = require('./index')
const app = new Koa()
app.use(async (ctx, next) => {
  console.time('handle')
  ctx.res.body = '<h1>hello koa.js</h1>'
  await next()
  console.timeEnd('handle')
})

app.use(async (ctx, next) => {
  ctx.res.body += '<h2>专注分享前端技术</h2>'
  await next()
})

app.use(async (ctx, next) => {
  ctx.res.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>hello koa</title>
    </head>
    <body>${ctx.res.body}</body>
    </html>`
  ctx.res.setHeader('Content-Type', 'text/html; charset=utf-8')
  await next()
})

app.listen(8081, () => {
  console.log('server is listening at localhost:8081')
})
