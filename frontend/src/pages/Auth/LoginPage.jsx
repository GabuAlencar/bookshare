// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react"; // Instale lucide-react se necessário

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Preencha e-mail e senha.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        navigate("/home");
      } else {
        setError(data.error || "Erro no login.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/book-logo.svg" alt="Bookshare" className="w-20 mb-2" />
          <h1 className="text-xl font-semibold text-gray-800">Bookshare</h1>
          <p className="text-sm text-gray-500 mt-1">Entre na sua conta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="alex@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Mail className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Entre com a sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Lock className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>


          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md shadow-md hover:bg-blue-800 transition"
          >
            Entrar
          </button>

      {/*
        <p className="text-sm text-center mt-4 text-gray-600"> 
          Caso não tenha uma conta{" "} 
          <a href="/register" className="text-blue-600 underline">
            Registre-se
          </a>
        </p> 
      */} 

        </form>
      </div>
    </div>
  );
}
