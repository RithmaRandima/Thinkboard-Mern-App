import React from "react";
import { formatDate } from "../lib/utils.js";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
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

        <button>delete</button>
      </div>
    </Link>
  );
};

export default NoteCard;
