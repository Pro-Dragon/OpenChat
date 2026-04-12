import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import Message from './models/Messages.js'
import dotenv from 'dotenv'
import cors from "cors";
const app = express()
const server = http.createServer(app)

app.use(cors({
  origin: "*"
}));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log("database connected")})
.catch(err => console.log(err));

io.on('connection', async (socket) => {
    console.log('User Connected')

    const messages = await Message.find() // fina all the data and store it in the messages variable.
    socket.emit("load_old_messages", messages)

    socket.on("send_message", async (data) => {
      const newMessage = new Message(data);
      await newMessage.save();
      io.emit("receive_messages", data);
    })
})
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server is running at port http://localhost:3000")
})

