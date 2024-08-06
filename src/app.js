import express from "express";
import cors from "cors";
import morgan from "morgan";
import videoCallRoutes from "./routes/videoCallRoutes.js";
import {initializeServer} from "./config/socketConfig.js"
//config app express
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config show requests
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//Routes

app.use("/api/videocall", videoCallRoutes);

// Inicializar servidor y socket.io
const server = initializeServer(app);

const SocketPORT = process.env.SocketPORT || 5000;
server.listen(SocketPORT, () => {
  console.log(`Server Socket running on port ${SocketPORT}`);
});

export default app;