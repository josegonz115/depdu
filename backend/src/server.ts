import "dotenv/config";
import express from "express";
import cors from "cors";
// import authRoutes from "./routes/auth.routes";
import testRouter from "./routes/test.routes.js";
import createTestRouter from "./routes/test.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import { createServer } from "http";
import {startResponse} from './langchain/langchain.js';


const app = express();
const port = process.env.PORT || 5000;
const socketPort = process.env.SOCKET_PORT || 5010;


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"], // Allow GET and POST methods
    },
});

// socket server 
const socket = httpServer.listen(socketPort, () => {
    console.log(`socket listening on port ${socketPort}`);
});

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("button pressed", async() => {
        const stream = await startResponse();
        for await (const chunkString of stream) {
            socket.emit("chatbox", chunkString);
        }
        socket.emit("chatbox end");
    });

    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});




// http server
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/api/auth", authRoutes);
app.use("/api/test", testRouter);
app.use("/api/ai", aiRoutes);
app.use(errorMiddleware);

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
