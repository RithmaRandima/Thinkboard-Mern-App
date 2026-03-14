import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

const NoteDetailPage = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    <div className="min-h-screen flex flex-col p-7">
      <div>
        <h1 className="text-[40px] font-extrabold mb-5 p-5 ">Change My Note</h1>
      </div>
      {/* container */}
      <div className="min-w-115 mx-auto relative  py-5">
        {/* card section */}
        <div className="flex flex-col gap-5">
          {/* input */}
          <div className="flex flex-col gap-1">
            <label className="text-[30px] font-bold ">Title</label>
            <input
              type="text"
              className="bg-gray-200 py-2 px-5 rounded-full "
              placeholder="Enter Title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>
          {/* text area */}
          <div className="flex flex-col gap-1">
            <label className="text-[30px] font-bold ">Content</label>

            <textarea
              type="text"
              rows={5}
              className="bg-gray-200 py-2 px-5 rounded-2xl "
              placeholder="Write Your Note Here"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
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
              className="mt-2 py-2 flex gap-2 items-center cursor-pointer px-5 bg-red-700 text-white rounded-full font-bold mr-5 hover:bg-gray-100 hover:text-black duration-300 hover:-translate-y-2 hover:shadow-[1px_1px_3px_black] animate-bounce [animation-duration:2s]"
            >
              <FaTrash className="" />
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
