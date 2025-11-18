import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EnvelopeFill, LockFill, Book, ArrowRight, KeyFill } from "react-bootstrap-icons";

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
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
      <div className="glass-card p-5 w-100" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-4 fade-in">
          <div className="mb-3">
            <Book size={90} className="text-primary logo-pulse" />
          </div>
          <h1 className="fw-bold text-primary mb-2">BookShare</h1>
          <p className="text-muted">Entre na sua conta</p>
        </div>

        <form onSubmit={handleLogin} className="fade-in">
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
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <LockFill className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
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
            <span>Entrar</span>
            <ArrowRight size={18} />
          </button>

          <div className="text-center mb-3">
            <Link 
              to="/forgot-password" 
              className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-2"
            >
              <KeyFill size={16} />
              <span>Esqueci minha senha</span>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-muted mb-0">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-primary fw-bold text-decoration-none">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
