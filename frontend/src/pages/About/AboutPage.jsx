import Layout from "../../components/Layout";
import {
  Journal,
  Heart,
  Code,
  People,
  Lightbulb,
  Rocket
} from "react-bootstrap-icons";

export default function AboutPage() {
  const features = [
    {
      icon: Journal,
      title: "Gestão de Livros",
      description: "Cadastre e organize seu acervo de forma simples e eficiente"
    },
    {
      icon: People,
      title: "Gestão de Clientes",
      description: "Mantenha um registro completo de todos os clientes"
    },
    {
      icon: Rocket,
      title: "Empréstimos",
      description: "Controle de empréstimos e devoluções de forma automatizada"
    },
    {
      icon: Lightbulb,
      title: "Interface Moderna",
      description: "Design responsivo e intuitivo para melhor experiência"
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">Sobre o BookShare</h1>
          <p className="lead text-secondary">
            Sistema corporativo de gestão de biblioteca
          </p>
        </div>

        <div className="glass-card p-5 mb-5 text-center border-0 shadow-sm border-top border-primary border-3">
          <h2 className="fw-bold text-dark mb-4 d-flex justify-content-center align-items-center gap-2">
            Bem-vindo ao BookShare
          </h2>
          <p className="fs-5 text-secondary mb-4">
            O BookShare é uma plataforma robusta desenvolvida para facilitar
            a gestão de bibliotecas corporativas e institucionais. Com ele, você pode cadastrar livros, gerenciar clientes
            e controlar empréstimos de forma simples, eficiente e auditável.
          </p>
          <div className="text-secondary mb-4 border-top pt-3">
            <p className="mb-2 fw-semibold">Desenvolvido por:</p>
            <p className="mb-1">Kevin Ramon da Silva</p>
            <p className="mb-0">Gabriel Francisco Santos de Alencar</p>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12">
            <h3 className="text-dark fw-bold mb-4 text-center border-bottom pb-2">
              <Code className="me-2 text-primary" size={28} />
              Funcionalidades Principais
            </h3>
          </div>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <div className="glass-card p-4 h-100 text-center shadow-sm">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                    <IconComponent size={32} className="text-primary" />
                  </div>
                  <h5 className="fw-bold text-dark mb-3">{feature.title}</h5>
                  <p className="text-secondary small mb-0">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-4 text-center">
          <h5 className="fw-bold text-dark mb-2">Versão 1.0</h5>
          <p className="text-secondary small mb-0">
            &copy; {new Date().getFullYear()} BookShare - Plataforma de Gestão
          </p>
        </div>
      </div>
    </Layout>
  );
}
