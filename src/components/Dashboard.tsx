import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Note = { id: string; title: string; created_at: string };

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    setNotes(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen">
      <nav className="px-8 h-[10vh] bg-[#304D30] w-full flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-bold text-[#EEE7DA]">Note-Keep</Link>
        <button className="p-3 bg-red-400 text-white px-4 rounded-sm" onClick={handleLogout}>Log out</button>
      </nav>
      <main className="p-8 w-full">
        <header className="flex items-center justify-between">
          <h2 className="font-bold text-xl mb-3">Available Notes</h2>
          <Link to="/create" className="bg-blue-600 text-white rounded-md p-4 mb-3 block">Add Note</Link>
        </header>
        <div className="w-full">
          {notes.length === 0 && <p className="opacity-60">No notes yet. Create your first one!</p>}
          {notes.map((n) => (
            <Link key={n.id} to={`/notes/${n.id}`} className="bg-[#EEE7DA] rounded-md p-4 mb-3 block">
              <h3 className="font-bold text-lg mb-2">{n.title}</h3>
              <p className="text-sm">Created on {new Date(n.created_at).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}