const http = require('http');
const app = require('./app');
const server =http.createServer(app);

PORT = process.env.PORT || 7003;

server.listen(PORT,()=>{
    console.log("Server is running on "+ PORT);
})