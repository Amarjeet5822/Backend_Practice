const http = require('http')

const server = http.createServer((request, response) => {
  response.writeHead(200, { "content-type":"text/html"})
  response.end("Hello, World!");
});
server.listen(3000, () => {
  console.log("server is running on localhost:3000")
})