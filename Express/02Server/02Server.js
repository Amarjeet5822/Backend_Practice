const http = require("http")

const server = http.createServer((req, res) => {
  if(req.url === "/" && req.method ==="GET"){
    res.writeHead(200, { "Content-type" : "text/html"});
    res.end("Home Page")
  } else if (req.url ==="/about" && req.method === "GET"){
    res.writeHead(200, { "Content-type": "text/plain"});
    res.end("About Page")
  } else {
    res.writeHead(404, {"Content-type": "text/html"});
    res.end("Page not Found")
  }
})
server.listen(3000, () => {
  console.log("This server is running at 3000")
})