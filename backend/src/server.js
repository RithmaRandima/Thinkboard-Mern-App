import dotenv from "dotenv";
dotenv.config();

import express from "express";
import noteRouter from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
server.use(express.json());
server.use("/api/notes", noteRouter);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server Running on Port ", PORT);
  });
});
