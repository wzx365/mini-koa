const http = require('http')
debugger

const server = http.createServer((req, res) => {
  debugger
  console.log('handle...')
  // res.body = '<h1>welcome to HangZhou, China.</h1>'
  res.end(res.body || 'hello')
})

server.listen(8000)