import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/"); // redireciona para login
      } else {
        setError(data.error || "Erro no registro");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/book-logo.svg" alt="Bookshare" className="w-20 mb-2" />
          <h1 className="text-xl font-semibold text-gray-800">Bookshare</h1>
          <p className="text-sm text-gray-500 mt-1">Crie sua conta</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <User className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Mail className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Crie uma senha"
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
            Criar conta
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Já tem uma conta?{" "}
          <a href="/" className="text-blue-600 underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
