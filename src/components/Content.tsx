import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Content() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => { loadNote(); }, [slug]);

  const loadNote = async () => {
    const { data } = await supabase.from("notes").select("*").eq("id", slug).single();
    if (data) {
      setNote(data);
      setTitle(data.title);
      setContent(data.content);
    }
  };

  const handleUpdate = async () => {
    await supabase.from("notes").update({ title, content }).eq("id", slug);
    setEditing(false);
    loadNote();
  };

  const handleDelete = async () => {
    if (confirm("Delete this note?")) {
      await supabase.from("notes").delete().eq("id", slug);
      navigate("/dashboard");
    }
  };

  if (!note) return <div className="p-8">Loading...</div>;

  return (
    <div className="w-full min-h-screen">
      <nav className="px-8 h-[10vh] bg-[#304D30] w-full flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-bold text-[#EEE7DA]">Note-Keep</Link>
        <div>
          <button onClick={handleDelete} className="p-3 bg-red-400 text-white px-4 rounded-md mr-3">Delete</button>
          {editing ? (
            <button onClick={handleUpdate} className="p-3 bg-green-600 text-white px-4 rounded-md">Save</button>
          ) : (
            <button onClick={() => setEditing(true)} className="p-3 bg-blue-600 text-white px-4 rounded-md">Update</button>
          )}
        </div>
      </nav>
      <main className="p-8 w-full max-w-3xl mx-auto">
        {editing ? (
          <>
            <input className="w-full border-2 p-3 rounded-md text-2xl mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="w-full border-2 p-3 rounded-md" rows={15} value={content} onChange={(e) => setContent(e.target.value)} />
          </>
        ) : (
          <>
            <h2 className="font-bold text-2xl">{note.title}</h2>
            <p className="text-sm mb-3 opacity-40 italic">Created on {new Date(note.created_at).toLocaleDateString()}</p>
            <div className="mt-8 opacity-80 whitespace-pre-wrap">{note.content}</div>
          </>
        )}
      </main>
    </div>
  );
}