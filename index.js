const http = require('http')
const Stream = require('stream')
const compose = require('./compose')

module.exports = class Koa {
  constructor() {
    this.middlewares = [];
  }

  // 使用use方法注册中间件
  // 返回this, 使其可以链式注册
  use(fn) {
    this.middlewares.push(fn)
    return this
  }

  // 创建服务, 服务处理流程, 和端口监听 
  listen(...args) {
    let server = http.createServer((req, res) => this.callback(req, res))
    server.listen(...args)
  }

  // http的请求与响应处理流程
  callback(req, res) {
    const middlewareFN = compose(this.middlewares)
    const context = { req, res }
    this.handleRequest(context, middlewareFN)
  }

  // 请求处理流程
  handleRequest(ctx, middlewareFN) {
    middlewareFN(ctx)
      .then(() => this.handleResponse(ctx))
      .catch(this.handleError)
  }

  // 响应处理流程
  handleResponse(ctx) {
    let body = ctx.res.body
    let res = ctx.res
    if (Buffer.isBuffer(body)) return res.end(body)
    if (typeof body === 'String') return res.end(body)
    if (body instanceof Stream) return res.pipe(res)
    // body = JSON.stringify(body)
    ctx.res.end(body)
  }

  // 错误处理
  handleError(error) {
    console.log('error', error)
  }

}