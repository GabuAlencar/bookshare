import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EnvelopeFill, KeyFill, Person, Book, ArrowRight, ArrowLeft } from "react-bootstrap-icons";

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
        navigate("/");
      } else {
        setError(data.error || "Erro no registro");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
      <div className="glass-card p-5 w-100" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-4 fade-in">
          <div className="mb-3">
            <Book size={90} className="text-primary logo-pulse" />
          </div>
          <h1 className="fw-bold text-primary mb-2">BookShare</h1>
          <p className="text-muted">Crie sua conta</p>
        </div>

        <form onSubmit={handleRegister} className="fade-in">
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Nome Completo</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-modern ps-5"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Person className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
            </div>
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">E-mail</label>
            <div className="position-relative">
              <input
                type="email"
                className="form-control form-control-modern ps-5"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <EnvelopeFill className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
            </div>
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold">Senha</label>
            <div className="position-relative">
              <input
                type="password"
                className="form-control form-control-modern ps-5"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <KeyFill className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 btn-modern d-flex align-items-center justify-content-center gap-2 mb-3"
          >
            <span>Criar conta</span>
            <ArrowRight size={18} />
          </button>

          <div className="text-center">
            <Link 
              to="/" 
              className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Já tem uma conta? Entrar</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
