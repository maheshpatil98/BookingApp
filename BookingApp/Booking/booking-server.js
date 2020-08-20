const http = require('http');
const app = require('./app');
const server = http.createServer(app);

PORT = process.env.PORT || 7002

server.listen(PORT,()=>{
    console.log("server is ruunning on : http//localhost:"+PORT);
})