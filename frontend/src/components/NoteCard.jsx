import React from "react";
import { formatDate } from "../lib/utils.js";
import { Link } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handelDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure You want to delete this note? ")) return;

    try {
      await api.delete(`notes/${id}`);
      toast.success("Note Delete Successfully");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error in delete Note Function!", error);
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link to={`notes/${note._id}`} className="bg-red-300 mb-5">
      <p>{note.title}</p>
      <p>{note.content}</p>

      <div>
        {/* date section */}
        <div>{formatDate(note.createdAt)}</div>
      </div>

      <div>
        <button>edit</button>

        <button onClick={(e) => handelDelete(e, note._id)}>delete</button>
      </div>
    </Link>
  );
};

export default NoteCard;
