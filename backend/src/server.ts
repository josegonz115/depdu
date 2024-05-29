import "dotenv/config";
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import { createServer } from "http";
import {appendResponses, startResponse} from './langchain/langchain.js';
// import { fileURLToPath } from 'url';
import path from 'path';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const rootDir = path.resolve(__dirname);


export interface THistory {
    text: string;
    sender: "user" | "llm";
    profileIcon?: string;
}

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

// // socket server 
// httpServer.listen(socketPort, () => {
//     console.log(`socket listening on port ${socketPort}`);
// });

io.on("connection", async(socket) => {
    console.log("user connected");
    console.log(`socket listening on ${port}`);

    socket.on("page loaded", async() => {
        const stream = await startResponse();
        for await (const chunkString of stream) {
            socket.emit("chatbox", chunkString);
        }
        socket.emit("chatbox end");
    });

    socket.on("button pressed", async(data:THistory[]) => {
        console.log(data);//TESTING
        const stream = await appendResponses(data);
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

app.use("/api/ai", aiRoutes);
app.use(errorMiddleware);


__dirname = path.resolve(); 
if (process.env.NODE_ENV === 'any'){
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    // any route not api will be redirected to index.html
    app.get('*', (_req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    )
}else{
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}



httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
