import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import Connection from "./database/db.js";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import todoListRoutes from "./routes/todoListRoutes.js";

const app = express();

// configure env
dotenv.config();

// connecting to database
Connection()

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

//Routes
app.use("/api/user", userRoutes);
app.use("/api/todoList", todoListRoutes);

const PORT = process.env.PORT || 8000



app.listen(PORT, () => {
    console.log(`Port Connected to server ${PORT}`.yellow.bgCyan)
})