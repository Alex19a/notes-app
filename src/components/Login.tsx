import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate("/dashboard");
  };

  return (
    <div className="h-screen w-full flex">
      <section className="md:w-[60%] w-full p-8 flex flex-col justify-center">
        <h2 className="text-3xl mb-8 font-bold text-[#304D30]">Log in</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="w-full mb-6" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" className="w-full rounded-md border border-gray-400 py-2 px-4 mb-6"
            value={email} required onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" className="w-full rounded-md border border-gray-400 py-2 px-4 mb-4"
            value={password} required onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-[#304D30] text-white px-8 py-4 rounded-md">LOG IN</button>
        </form>
        <p>Don't have an account? <Link to="/register" className="text-[#5C8374]">Register</Link></p>
      </section>
    </div>
  );
}