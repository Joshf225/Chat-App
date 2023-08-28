const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credetentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  //setting userId and socket id to global map
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    //checking if msg sending to a user is online then emitting msg to user and storing msg in database,if not its stored into database
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
