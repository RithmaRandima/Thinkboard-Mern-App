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
    <div className="min-h-screen">
      <div className="container max-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"}>Back to home</Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2>Create New Note</h2>

              <form onSubmit={handelsubmit}>
                {/* input */}
                <div>
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* text area */}
                <div>
                  <label htmlFor="">Content</label>
                  <textarea
                    type="text"
                    placeholder="Write Your Note Here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                {/* button */}
                <div>
                  <button type="submit">
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
