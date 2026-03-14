import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are Required!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note Create Successfully");
      navigate("/");
    } catch (error) {
      console.log("Faild to Create Note!");
      toast.error("Error Creating Note!", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col p-7">
      <div>
        <h1 className="text-[40px] font-extrabold mb-5 p-5 ">
          Create New Note
        </h1>
      </div>
      {/* container */}
      <div className="min-w-115 mx-auto relative  py-5">
        {/* card section */}
        <form onSubmit={handelsubmit} className="flex flex-col gap-5">
          {/* input */}
          <div className="flex flex-col gap-1">
            <label className="text-[30px] font-bold ">Title</label>
            <input
              type="text"
              className="bg-gray-200 py-2 px-5 rounded-full "
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {/* button */}
          <div>
            <button
              type="submit"
              className="mt-2 py-2 px-5 bg-black text-white rounded-full font-bold mr-5 hover:bg-gray-100 hover:text-black duration-300 hover:-translate-y-2 hover:shadow-[1px_1px_3px_black]"
            >
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
