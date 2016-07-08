const net = require('net');
const fs = require('fs');

const server = net.createServer((socket)=>{
  socket.on('data', (data)=>{
    data = data.toString();
    console.log(data);
    let endOfRequestURI = data.indexOf(' ', 4); //12
    let requestURI = data.slice(4, endOfRequestURI); // /surfing
    console.log(requestURI);
    fs.readFile('.'+requestURI, (err, data)=>{
      if(err){
        throw err;
      }else{
        let body = data.toString();
        console.log(body);
      }
    });

  });

});

server.listen('8080', () =>{
  console.log('Server listening on port 8080.');
});
