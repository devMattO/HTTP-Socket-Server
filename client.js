const net = require('net');
const http = require('http');
const client = new net.Socket();

client.connect({port: 8080}, (()=>{
  console.log('Connected to server.');
}));