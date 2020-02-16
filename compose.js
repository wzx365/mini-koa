// koa-compose 高阶函数
// 递归调用中间件 洋葱模式
module.exports = function compose(middlewares = []) {
  return function (context) {
    const len = middlewares.length
    let index = 0
    return dispatch(index)
    function dispatch(i) {
      const fn = middlewares[i]
      index++
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(context, dispatch.bind(null, index)))
    }
  }
}