import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { createServer } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

let app = express();
let server = createServer(app);
const io = new Server(server);
const port = parseInt(process.env.PORT as string);
app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get('/', (_, res) => {
  res.sendFile(join(__dirname, './index.html'))
})


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
 

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })