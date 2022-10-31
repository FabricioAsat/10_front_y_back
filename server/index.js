import { PORT } from "./config.js";
import { mongoConnection } from "./mongoConnection.js";
import server from "./server.js";
import http from "http";

import { Server } from "socket.io";

const httpServer = http.createServer(server);

mongoConnection();

httpServer.listen(PORT, () => console.log(`Server listening in port ${PORT}`));

const io = new Server(httpServer, {
	cors: { origin: `*`, credentials: true },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (!!sendUserSocket) socket.to(sendUserSocket).emit("msg-recieved", data.message);
	});
});
