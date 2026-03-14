import React from "react";
import { formatDate } from "../lib/utils.js";
import { Link } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";

const NoteCard = ({ note, setNotes, setCurrentStatus }) => {
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
    <div className="bg-white mb-5 w-full rounded-2xl p-4 shadow-[1px_1px_3px_black] hover:scale-105 duration-200">
      <p className="text-[19px] font-bold capitalize tracking-[2px] mb-3">
        {note.title}
      </p>
      <p className="text-[13px] capitalize tracking-[2px] mb-3">
        {note.content}
      </p>

      <div className="flex justify-between mt-15 items-end">
        {/* date section */}
        <div className="text-[12px] font-bold tracking-[1px]">
          {formatDate(note.createdAt)}
        </div>
        {/* button section */}
        <div className="flex">
          <Link
            to={`notes/${note._id}`}
            onClick={() => setCurrentStatus("back")}
            className="w-9 h-9 rounded-full text-black flex items-center justify-center hover:text-blue-600 "
          >
            <RiPencilFill className="text-[22px]" />
          </Link>

          <button
            onClick={(e) => handelDelete(e, note._id)}
            className="w-9 h-9 bg-black rounded-full text-white flex items-center justify-center hover:bg-white hover:text-red-500"
          >
            <IoMdTrash className="text-[22px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
