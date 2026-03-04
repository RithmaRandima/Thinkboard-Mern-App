import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

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
    <div className="min-h-screen">
      {/* container */}
      <div>
        {/* nav section */}
        <div className="flex items-center justify-between">
          <Link to={"/"}>back to home</Link>
          <button onClick={() => handelDelete(id)}>delete Note</button>
        </div>

        {/* card section */}
        <div>
          {/* body */}
          <div>
            {/* input */}
            <div>
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>
            {/* text area */}
            <div>
              <label htmlFor="">Content</label>
              <textarea
                type="text"
                placeholder="Write Your Note Here"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>
            {/* button */}
            <div>
              <button
                type="submit"
                disabled={saving}
                onClick={() => handelSave(id)}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
