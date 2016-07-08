const net = require('net');
const fs = require('fs');

const server = net.createServer((socket)=>{
  socket.on('data', (data)=>{

    data = data.toString();
    let endOfRequestURI = data.indexOf(' ', 4);
    let requestURI = data.slice(4, endOfRequestURI);

    fs.readFile('.'+ requestURI, (err, data) => {
      if(err){
        throw err; //body = 404 error page????
      }else{
        let body = data.toString();
        let output =
          `HTTP/1.1 200 OK
          content-length: ${body.length}

          ${body}`;
        socket.write(output);
      }
    });
  });
});

server.listen('8080', () =>{
  console.log('Server listening on port 8080.');
});
