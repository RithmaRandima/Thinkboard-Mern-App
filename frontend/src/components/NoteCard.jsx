import React from "react";
import { formatDate, formatDueDate } from "../lib/utils.js";
import { Link } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { BsFillPinAngleFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { FaBook, FaBriefcase, FaLightbulb } from "react-icons/fa6";
import { MdPerson, MdWork, MdSchool, MdLightbulb } from "react-icons/md";

const NoteCard = ({ note, setNotes, setCurrentStatus }) => {
  const priorityColors = {
    high: "bg-red-300",
    medium: "bg-yellow-200",
    low: "bg-green-300",
  };

  const categoryIcons = {
    personal: <MdPerson />,
    work: <MdWork />,
    study: <MdSchool />,
    ideas: <MdLightbulb />,
  };

  console.log(priorityColors[note.priority]);

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
    <div
      className={` mb-5 w-full rounded-2xl p-4 shadow-[1px_1px_3px_black] relative hover:scale-105 duration-200
    ${priorityColors[note.priority] || "bg-gray-200"}
    `}
    >
      <div className="absolute -right-3 -top-6 text-[40px]">
        <BsFillPinAngleFill />
      </div>

      {/* title and icon */}
      <div className="flex items-center gap-1 mb-3">
        <p className="text-[22px] font-bold capitalize tracking-[2px]">
          {note.title}
        </p>
        <div className="text-[19px]">{categoryIcons[note.category]}</div>
      </div>

      {/* content */}
      <p className="text-[14px] capitalize tracking-[2px] mb-4 min-h-10 ">
        {note.content}
      </p>

      <p className="absolute bottom-15 font-extralight">
        Due Date:
        <span className="font-extrabold animate-pulse">
          {" "}
          {formatDueDate(note.dueDate)}
        </span>
      </p>

      <div className="flex justify-between mt-15 items-end">
        {/* date section */}
        <div className=" tracking-[1px]">
          <p className="text-[10px]">
            Created At
            <span className="block ml-5 text-[13px] font-bold">
              {formatDate(note.createdAt)}
            </span>
          </p>
        </div>
        {/* button section */}
        <div className="flex">
          <Link
            to={`notes/${note._id}`}
            onClick={() => setCurrentStatus("back")}
            className="w-9 h-9 rounded-full text-white flex items-center justify-center hover:text-black "
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
