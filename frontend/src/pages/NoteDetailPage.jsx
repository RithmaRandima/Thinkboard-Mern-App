import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

const NoteDetailPage = ({ setCurrentStatus }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState({
    title: "",
    dueDate: "",
    category: "",
    priority: "",
    content: "",
  });

  const handelOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNote((note) => ({ ...note, [name]: value }));
  };

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true); // start loading
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching Note", error);
        toast.error("Failed to fetch the Note");
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchNote();
  }, [id]);

  console.log(note);

  const handelDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`notes/${id}`);
      toast.success("Note Delete Success");
      navigate("/");
      setCurrentStatus("create");
    } catch (error) {
      console.log("Faild to Delete Note!", error);
      toast.error("Error deleting Note!");
    }
  };
  const handelSave = async (id) => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add title and content");
      return;
    }
    setSaving(true);

    try {
      await api.put(`notes/${id}`, note);
      toast.success("Note Updated Success!");
      navigate("/");
      setCurrentStatus("create");
    } catch (error) {
      console.log("Faild to Update Note!", error);
      toast.error("Error updating Note!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        {" "}
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-7 pt-0">
      <div>
        <h1 className="text-[40px] font-extrabold mb-5 pt-5 pl-5 ">
          Change My Note
        </h1>
      </div>
      {/* container */}
      <div className="min-w-120 mx-auto relative  pt-1 py-5">
        {/* card section */}
        <div className="flex flex-col gap-3">
          {/* title and due date */}
          <div className="flex items-center gap- ">
            {/* title input */}
            <div className="flex flex-col gap-1 w-[50%]">
              <label className="text-[24px] font-bold ">Title</label>
              <input
                type="text"
                className="bg-gray-200 py-2 px-5 rounded-full "
                placeholder="Enter Title"
                name="title"
                value={note.title}
                onChange={handelOnChange}
              />
            </div>
            {/* date input */}
            <div className="flex flex-col gap-1 w-[50%]">
              <label className="text-[24px] font-bold ">Due</label>
              <input
                type="date"
                className="bg-gray-200 py-2 px-5 rounded-full "
                placeholder="Enter Date"
                name="dueDate"
                value={note.dueDate}
                onChange={handelOnChange}
              />
            </div>
          </div>

          {/* category and Priyority */}
          <div className="flex items-center gap-5">
            {/* category */}
            <div className="flex flex-col gap-1 w-[50%]">
              <label className="text-[24px] font-bold ">Category</label>
              <select
                className="bg-gray-200 py-2 px-5 rounded-full"
                name="category"
                value={note.category}
                onChange={handelOnChange}
              >
                <option value="">Select Category</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="personal">Personal</option>
                <option value="ideas">Ideas</option>
              </select>
            </div>

            {/* Priyority */}
            <div className="flex flex-col gap-1 w-[50%]">
              <label className="text-[24px] font-bold ">Priority</label>
              <select
                className="bg-gray-200 py-2 px-5 rounded-full"
                name="priority"
                value={note.priority}
                onChange={handelOnChange}
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* content text area */}
          <div className="flex flex-col gap-1">
            <label className="text-[24px] font-bold ">Content</label>

            <textarea
              type="text"
              rows={5}
              className="bg-gray-200 py-2 px-5 rounded-2xl "
              placeholder="Write Your Note Here"
              value={note.content}
              name="content"
              onChange={handelOnChange}
            />
          </div>
          {/* button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={saving}
              onClick={() => handelSave(id)}
              className="mt-2 py-2 px-5 bg-black cursor-pointer text-white rounded-full font-bold mr-5 hover:bg-gray-100 hover:text-black duration-300 hover:-translate-y-2 hover:shadow-[1px_1px_3px_black]"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => handelDelete(id)}
              className="mt-2 mr-2 text-red-600 hover:scale-110 duration-200 cursor-pointer animate-bounce [animation-duration:2s]"
            >
              <FaTrash className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
