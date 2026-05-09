import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EnvelopeFill, KeyFill, Person, Book, ArrowRight, ArrowLeft } from "react-bootstrap-icons";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return "A senha deve ter no mínimo 6 caracteres.";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pwd))
      return "A senha deve conter ao menos 1 caractere especial (ex: !@#$%).";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

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
      <div className="glass-card p-5 w-100 border-0 shadow-lg" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-4 fade-in">
          <div className="mb-4">
            <img src="/logo.png" alt="BookShare Logotipo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '95px' }} className="d-block mx-auto mb-2" onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<h1 class="fw-bold text-dark mb-2">BookShare</h1>'; }} />
            <h2 className="fw-bold text-dark fs-4 mt-2 mb-0">Bookshare</h2>
          </div>
          <p className="text-secondary">Cadastro de Novo Usuário</p>
        </div>

        <form onSubmit={handleRegister} className="fade-in">
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold text-secondary small text-uppercase">Nome Completo</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-modern ps-5"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Person className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
            </div>
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold text-secondary small text-uppercase">E-mail Corporativo</label>
            <div className="position-relative">
              <input
                type="email"
                className="form-control form-control-modern ps-5"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <EnvelopeFill className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
            </div>
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold text-secondary small text-uppercase">Senha de Acesso</label>
            <div className="position-relative">
              <input
                type="password"
                className="form-control form-control-modern ps-5"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <KeyFill className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
            </div>
            <small className="text-muted mt-1 d-block" style={{ fontSize: "0.78rem" }}>
              Mínimo 6 caracteres e ao menos 1 caractere especial (ex: !@#$%)
            </small>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
              <span className="small fw-semibold">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 btn-modern d-flex align-items-center justify-content-center gap-2 mb-3 shadow-sm"
          >
            <span>Cadastrar Usuário</span>
            <ArrowRight size={18} />
          </button>

          <div className="text-center border-top pt-3 mt-2">
            <Link 
              to="/" 
              className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-2 small"
            >
              <ArrowLeft size={16} />
              <span>Já possui acesso? Entrar</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
