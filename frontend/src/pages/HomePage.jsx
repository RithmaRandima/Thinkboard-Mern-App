import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios.js";

function NotesComponent() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to load notes!");
      } finally {
        setLoading(false); // ✅ hide loading after fetch
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-400">
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-red-300">Loading notes....</div>
        )}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => {
              return (
                <NoteCard note={note} key={note._id} setNotes={setNotes} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesComponent;
