import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!email.trim() || !newPassword.trim()) {
      setFeedback("Informe e-mail e nova senha.");
      setIsError(true);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            newPassword: newPassword.trim(),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setFeedback("Senha atualizada com sucesso! Você será redirecionado.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setIsError(true);
        setFeedback(data.error || "Não foi possível redefinir a senha.");
      }
    } catch (error) {
      setIsError(true);
      setFeedback("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/book-logo.svg" alt="Bookshare" className="w-20 mb-2" />
          <h1 className="text-xl font-semibold text-gray-800">
            Recuperar senha
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Informe seu e-mail e uma nova senha
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
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
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Lock className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>

          {feedback && (
            <p className={`text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
              {feedback}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md shadow-md hover:bg-blue-800 transition"
          >
            Atualizar senha
          </button>
        </form>

        <div className="text-sm text-center mt-6 text-gray-600 space-y-1">
          <p>
            <Link to="/" className="text-blue-600 underline">
              Voltar para login
            </Link>
          </p>
          <p>
            Ainda sem conta?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

