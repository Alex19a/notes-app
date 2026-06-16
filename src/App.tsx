import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Content from "./components/Content";
import CreateContent from "./components/CreateContent";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/notes/:slug" element={<ProtectedRoute><Content /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateContent /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}