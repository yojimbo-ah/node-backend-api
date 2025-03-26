import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <form action="/about" method="POST">
          <input type="text" name="about">enter text </input>
          <button type="submit">Post Comment</button>
      </form>
    `);
    return res.end();
  }

  if (req.url === '/about' && req.method === 'POST') {
    const body = [] ;
    req.on('data' , (chunck) => {
        console.log(chunck) ;
        body.push(chunck) ;
    })
    req.on('end' , () => {
        const parsedBody = Buffer.concat(body).toString() ;
        console.log(parsedBody) ;
        const message = parsedBody.split('=')[1] ;
        fs.writeFile('message.txt', message , (err) => {
          if (err) {
            res.statusCode = 500 ;
            return res.end('internal server error')
          }
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();

        });
    })
    return ;
  }

  res.writeHead(500, { 'Content-Type': 'text/html' });
  return res.end('<h2>server error</h2>');
});



server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

