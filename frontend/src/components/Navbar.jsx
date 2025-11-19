import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  House, 
  
  Book, 
  People, 
  JournalBookmark, 
  ClockHistory, 
  Info, 
  BoxArrowRight,
  List,
  X,
  ArrowLeft
} from "react-bootstrap-icons";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  const name = localStorage.getItem("name");

  const showBack = location.pathname !== "/home" && location.pathname !== "/";
  
  // Verificar se está editando livro (tem query param 'edit' na URL)
  const searchParams = new URLSearchParams(location.search);
  const isEditingBook = location.pathname === "/cadastro-livro" && searchParams.get('edit');
  
  const handleBackClick = () => {
    if (isEditingBook) {
      navigate('/historico');
    } else {
      navigate('/home');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-modern fixed-top">
      <div className="container-fluid">
        {showBack && (
          <button
            className="btn btn-outline-secondary me-2 d-flex align-items-center"
            onClick={handleBackClick}
            aria-label={isEditingBook ? "Voltar para o histórico" : "Voltar para a página principal"}
          >
            <ArrowLeft size={20} />
            <span className="ms-2 d-none d-md-inline">Voltar</span>
          </button>
        )}
        <Link className="navbar-brand d-flex align-items-center fw-bold text-primary" to="/home">
          <Book className="me-2" size={28} />
          <span className="fs-4">BookShare</span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <List size={28} />}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          {/* collapse kept for accessibility; mobile overlay handles small screens */}
        </div>

        {/* Desktop links rendered centered in header */}
        <ul className="navbar-nav navbar-center mx-auto mb-2 mb-lg-0 d-none d-lg-flex">
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2 fw-semibold" 
              to="/home"
              onClick={() => setIsOpen(false)}
            >
              <House size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2 fw-semibold" 
              to="/cadastro-livro"
              onClick={() => setIsOpen(false)}
            >
              <Book size={20} />
              <span>Livro</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2 fw-semibold" 
              to="/cadastro-cliente"
              onClick={() => setIsOpen(false)}
            >
              <People size={20} />
              <span>Cliente</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2 fw-semibold" 
              to="/emprestimo"
              onClick={() => setIsOpen(false)}
            >
              <JournalBookmark size={20} />
              <span>Empréstimo</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2 fw-semibold" 
              to="/historico"
              onClick={() => setIsOpen(false)}
            >
              <ClockHistory size={20} />
              <span>Histórico</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2 fw-semibold" 
              to="/sobre"
              onClick={() => setIsOpen(false)}
            >
              <Info size={20} />
              <span>Sobre</span>
            </Link>
          </li>
        </ul>

        {/* Mobile overlay menu (visible on small screens when toggled) */}
        <div className={`mobile-menu-overlay d-lg-none ${isOpen ? 'open' : ''}`}>
            <button className="mobile-close btn btn-light rounded-circle" onClick={() => setIsOpen(false)} aria-label="Fechar menu">
              <X size={28} />
            </button>
            <ul className="navbar-nav py-4">
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2 fw-semibold" to="/home" onClick={() => setIsOpen(false)}>
                  <House size={20} />
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2 fw-semibold" to="/cadastro-livro" onClick={() => setIsOpen(false)}>
                  <Book size={20} />
                  <span>Livro</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2 fw-semibold" to="/cadastro-cliente" onClick={() => setIsOpen(false)}>
                  <People size={20} />
                  <span>Cliente</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2 fw-semibold" to="/emprestimo" onClick={() => setIsOpen(false)}>
                  <JournalBookmark size={20} />
                  <span>Empréstimo</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2 fw-semibold" to="/historico" onClick={() => setIsOpen(false)}>
                  <ClockHistory size={20} />
                  <span>Histórico</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2 fw-semibold" to="/sobre" onClick={() => setIsOpen(false)}>
                  <Info size={20} />
                  <span>Sobre</span>
                </Link>
              </li>
            </ul>
            <div className="p-3">
              <button className="btn btn-outline-danger w-100 btn-modern mobile-logout" onClick={() => { setIsOpen(false); handleLogout(); }}>
                <BoxArrowRight size={18} />
                <span>Sair</span>
              </button>
            </div>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto d-none d-lg-flex">
          {name && (
            <span className="text-muted d-none d-md-inline">
              Olá, <strong>{name}</strong>
            </span>
          )}
          <button
            className="btn btn-outline-danger btn-modern d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <BoxArrowRight size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
