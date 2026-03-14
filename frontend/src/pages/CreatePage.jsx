import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios.js";

const CreatePage = ({ setCurrentStatus }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    dueDate: "",
    category: "",
    priority: "",
    content: "",
  });

  const handelOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  console.log(data);
  console.log(typeof data.dueDate);

  const navigate = useNavigate();

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (
      !data.title.trim() ||
      !data.content.trim() ||
      !data.category ||
      !data.priority ||
      !data.dueDate.trim()
    ) {
      toast.error("All fields are Required!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", data);
      toast.success("Note Create Successfully");
      navigate("/");
      setCurrentStatus("create");
    } catch (error) {
      console.log("Faild to Create Note!");
      toast.error("Error Creating Note!", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col p-7 pt-0">
      <div>
        <h1 className="text-[40px] font-extrabold mb-5 pt-5 pl-5">
          Create New Note
        </h1>
      </div>
      {/* container */}
      <div className="min-w-120 mx-auto relative pt-1 pb-5">
        {/* card section */}
        <form onSubmit={handelsubmit} className="flex flex-col gap-3">
          {/* title and due date */}
          <div className="flex items-center gap-5 ">
            {/* title input */}
            <div className="flex flex-col gap-1 w-[50%]">
              <label className="text-[24px] font-bold ">Title</label>
              <input
                type="text"
                className="bg-gray-200 py-2 px-5 rounded-full "
                placeholder="Enter Title"
                name="title"
                value={data.title}
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
                value={data.dueDate}
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
                value={data.category}
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
                value={data.priority}
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
              name="content"
              value={data.content}
              onChange={handelOnChange}
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
