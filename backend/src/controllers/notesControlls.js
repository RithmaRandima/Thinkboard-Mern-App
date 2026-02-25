import Note from "../models/noteModel.js";

export const getAllNotes = async (req, res) => {
  try {
    const note = await Note.find();
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getAllNotes Function", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const getNoteByID = async () => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {}
};

export const createNote = async () => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      body,
      content,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote Function", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
export const updateNote = async () => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updateNote);
  } catch (error) {
    console.log("Error in updateNote Function", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(404).json({ message: "Note Delete Successfully" });
  } catch (error) {
    console.log("Error in DeleteNote Function", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
