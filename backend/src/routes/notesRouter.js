import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteByID,
  updateNote,
} from "../controllers/notesControlls.js";

const noteRouter = express.Router();

noteRouter.get("/", getAllNotes);
noteRouter.get("/:id", getNoteByID);
noteRouter.post("/", createNote);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;
