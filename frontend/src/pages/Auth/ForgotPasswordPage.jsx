import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EnvelopeFill, KeyFill, Journal, ArrowRight, ArrowLeft } from "react-bootstrap-icons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !newPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Senha alterada com sucesso! Redirecionando...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.error || "Erro ao redefinir senha.");
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
            <KeyFill size={60} className="text-primary" />
          </div>
          <h1 className="fw-bold text-primary mb-2">Redefinir Senha</h1>
          <p className="text-muted">Digite seu e-mail e a nova senha</p>
        </div>

        <form onSubmit={handleSubmit} className="fade-in">
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
            <label className="form-label fw-semibold">Nova Senha</label>
            <div className="position-relative">
              <input
                type="password"
                className="form-control form-control-modern ps-5"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

          {success && (
            <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 btn-modern d-flex align-items-center justify-content-center gap-2 mb-3"
          >
            <span>Redefinir Senha</span>
            <ArrowRight size={18} />
          </button>

          <div className="text-center">
            <Link 
              to="/" 
              className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Voltar ao login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
