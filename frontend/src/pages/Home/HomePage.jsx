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
      color: "primary"
    },
    {
      title: "Empréstimos",
      description: "Gerencie empréstimos e devoluções",
      icon: JournalBookmark,
      link: "/emprestimo",
      color: "primary"
    },
    {
      title: "Histórico",
      description: "Visualize todos os cadastros",
      icon: ClockHistory,
      link: "/historico",
      color: "primary"
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        {name && (
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              Bem-vindo, <span className="text-primary disabled-color-override">{name}</span>!
            </h1>
            <p className="lead text-secondary">
              Gerencie sua biblioteca com profissionalismo e eficiência.
            </p>
          </div>
        )}

        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="glass-card p-4 text-center border-0 shadow-sm border-top border-primary border-3">
              <h2 className="fw-bold text-dark mb-3">
                <Journal className="me-2 text-primary" size={32} />
                Gestão de Acervo
              </h2>
              <p className="text-secondary mb-4 fs-5">
                Organize seu acervo com facilidade. Sistema ágil e seguro. 
              </p>
              <p className="text-muted">
                Encontre, adicione e gerencie cada título com precisão.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <h3 className="text-dark fw-bold mb-4 border-bottom pb-2">
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
                    <h5 className="fw-bold text-dark mb-2">{action.title}</h5>
                    <p className="text-secondary small mb-3">{action.description}</p>
                    <span className={`text-${action.color} fw-semibold d-inline-flex align-items-center gap-2`}>
                      Acessar
                      <ArrowRight size={16} />
                    </span>
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
