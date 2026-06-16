import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      setSuccess("Check your email to confirm registration!");
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className="h-screen w-full flex">
      <section className="md:w-[60%] w-full p-8 flex flex-col justify-center">
        <h2 className="text-3xl mb-8 font-bold text-[#304D30]">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <form className="w-full mb-6" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" className="w-full rounded-md border border-gray-400 py-2 px-4 mb-3"
            value={email} required onChange={(e) => setEmail(e.target.value)} />
          <label>Password (min 7 chars)</label>
          <input type="password" className="w-full rounded-md border border-gray-400 py-2 px-4 mb-3"
            value={password} required minLength={7} onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-[#304D30] text-white px-8 py-4 rounded-md">REGISTER</button>
        </form>
        <p>Already have an account? <Link to="/login" className="text-[#5C8374]">Login</Link></p>
      </section>
    </div>
  );
}