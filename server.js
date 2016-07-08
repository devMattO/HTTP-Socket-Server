const net = require('net');
const fs = require('fs');

const server = net.createServer((socket)=>{
  socket.on('data', (data)=>{

    data = data.toString();
    let endOfRequestURI = data.indexOf(' ', 4);
    let requestURI = data.slice(4, endOfRequestURI);

    fs.readFile('.'+ requestURI, (err, data) => {
      if(err){
        fs.readFile('./404.html', (err, data) => {
          let body = data.toString();
          let output =
            `HTTP/1.0 404 NotFound
            content-length: ${body.length}

            ${body}`;
          socket.write(output);
          socket.end();
        });

      }else{
        let body = data.toString();
        let output =
          `HTTP/1.1 200 OK
          Content-Length: ${body.length}

          ${body}`;
        socket.write(output);
        socket.end();
        // end connection and console log to server that client received data etc..
      }
    });
  });
});

server.listen('8080', () =>{
  console.log('Server listening on port 8080.');
});
