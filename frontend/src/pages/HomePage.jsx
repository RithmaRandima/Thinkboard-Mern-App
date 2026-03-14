import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios.js";

function NotesComponent({ setCurrentStatus }) {
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
    <div className="min-h-screen p-7 pb-8 ">
      <div className="max-w-7xl mx-auto p-4 pt-5">
        {loading && (
          <div className="text-center text-red-300">Loading notes....</div>
        )}

        {notes.length > 0 && (
          <div className="flex flex-col pb-20">
            <div>
              <h1 className="text-[40px] font-extrabold mb-5">My Notes</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {notes.map((note) => {
                return (
                  <NoteCard
                    note={note}
                    key={note._id}
                    setNotes={setNotes}
                    setCurrentStatus={setCurrentStatus}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesComponent;
