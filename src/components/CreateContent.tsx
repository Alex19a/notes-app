import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateContent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => navigate("/dashboard");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notes").insert({ title, content, user_id: user.id });
    navigate("/dashboard");
  };

  return (
    <div className="w-full p-8 min-h-screen">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-[#304D30]">Create Content</h2>
        <MdCancel className="text-5xl text-red-500 cursor-pointer" onClick={handleCancel} />
      </header>
      <form className="w-full flex flex-col max-w-3xl" onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" className="border-2 p-4 rounded-md text-lg mb-5" value={title}
          required onChange={(e) => setTitle(e.target.value)} />
        <label>Content</label>
        <textarea rows={10} className="border-2 p-4 rounded-md text-lg mb-3" value={content}
          required onChange={(e) => setContent(e.target.value)} />
        <button className="px-6 py-3 bg-blue-500 text-white w-[200px] rounded-md">SAVE</button>
      </form>
    </div>
  );
}