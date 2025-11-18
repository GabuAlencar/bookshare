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
          <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-flex mb-4">
            <Journal size={60} className="text-primary" />
          </div>
          <h1 className="display-4 fw-bold text-white mb-3">Sobre o BookShare</h1>
          <p className="lead text-white-50">
            Sistema completo de gestão de biblioteca
          </p>
        </div>

        <div className="glass-card p-5 mb-5 text-center">
          <h2 className="fw-bold text-primary mb-4">
            <Heart className="me-2 text-danger" size={32} />
            Bem-vindo ao BookShare
          </h2>
          <p className="fs-5 text-muted mb-4">
            O BookShare é uma plataforma moderna e intuitiva desenvolvida para facilitar 
            a gestão de bibliotecas. Com ele, você pode cadastrar livros, gerenciar clientes 
            e controlar empréstimos de forma simples e eficiente.
          </p>
          <p className="text-muted">
            Desenvolvido com as melhores tecnologias para oferecer uma experiência 
            rápida, segura e agradável.
          </p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12">
            <h3 className="text-white fw-bold mb-4 text-center">
              <Code className="me-2" size={28} />
              Funcionalidades
            </h3>
          </div>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <div className="glass-card p-4 h-100 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                    <IconComponent size={32} className="text-primary" />
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted small">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-5 text-center">
          <h3 className="fw-bold text-primary mb-3">Versão 1.0</h3>
          <p className="text-muted mb-0">
            &copy; {new Date().getFullYear()} BookShare - Todos os direitos reservados
          </p>
        </div>
      </div>
    </Layout>
  );
}
