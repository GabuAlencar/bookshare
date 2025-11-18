import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { 
  Journal, 
  People, 
  JournalBookmark, 
  ClockHistory, 
  ArrowRight,
  StarFill
} from "react-bootstrap-icons";

export default function HomePage() {
  const name = localStorage.getItem("name");

  const quickActions = [
    {
      title: "Cadastrar Livro",
      description: "Adicione novos livros ao acervo",
      icon: Journal,
      link: "/cadastro-livro",
      color: "primary"
    },
    {
      title: "Cadastrar Cliente",
      description: "Registre novos clientes",
      icon: People,
      link: "/cadastro-cliente",
      color: "success"
    },
    {
      title: "Empréstimos",
      description: "Gerencie empréstimos e devoluções",
      icon: JournalBookmark,
      link: "/emprestimo",
      color: "info"
    },
    {
      title: "Histórico",
      description: "Visualize todos os cadastros",
      icon: ClockHistory,
      link: "/historico",
      color: "warning"
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        {name && (
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-white mb-3">
              Bem-vindo, <span className="text-warning">{name}</span>!
            </h1>
            <p className="lead text-white-50">
              Gerencie sua biblioteca com facilidade
            </p>
          </div>
        )}

        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="glass-card p-4 text-center">
              <h2 className="fw-bold text-primary mb-3">
                <Journal className="me-2" size={32} />
                Cadastre um livro
              </h2>
              <p className="text-muted mb-4 fs-5">
                Organize seu acervo com facilidade. Sem complicações. 
                Gestão rápida e eficiente.
              </p>
              <p className="text-muted">
                Encontre, registre e acompanhe cada título com precisão.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <h3 className="text-white fw-bold mb-4">
              Ações Rápidas
            </h3>
          </div>
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <Link 
                  to={action.link} 
                  className="text-decoration-none"
                >
                  <div className="glass-card p-4 h-100 text-center position-relative overflow-hidden">
                    <div className={`bg-${action.color} bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3`}>
                      <IconComponent size={40} className={`text-${action.color}`} />
                    </div>
                    <h5 className="fw-bold mb-2">{action.title}</h5>
                    <p className="text-muted small mb-3">{action.description}</p>
                    <span className={`text-${action.color} fw-semibold d-inline-flex align-items-center gap-2`}>
                      Acessar
                      <ArrowRight size={16} />
                    </span>
                    <div className={`position-absolute top-0 end-0 bg-${action.color} bg-opacity-10`} 
                         style={{ width: "100px", height: "100px", borderRadius: "0 20px 0 100px" }} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
