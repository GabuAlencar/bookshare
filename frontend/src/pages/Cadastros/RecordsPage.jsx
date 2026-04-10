import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { 
  Journal, 
  People, 
  ArrowRight,
  FileText,
  Grid
} from "react-bootstrap-icons";

export default function RecordsPage() {
  const records = [
    {
      title: "Livros",
      description: "Visualize todos os livros cadastrados no sistema",
      icon: Journal,
      link: "/historico",
      color: "primary",
      count: "Ver livros"
    },
    {
      title: "Clientes",
      description: "Visualize todos os clientes cadastrados",
      icon: People,
      link: "/historico",
      color: "primary",
      count: "Ver clientes"
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        <div className="text-center mb-5">
          <div className="bg-white bg-opacity-75 rounded-circle p-3 d-inline-flex mb-3 shadow-sm">
            <Grid size={50} className="text-primary" />
          </div>
          <h1 className="display-5 fw-bold text-dark mb-3">
            Lista de Cadastros
          </h1>
          <p className="lead text-secondary">
            Acesse os registros de livros e clientes
          </p>
        </div>

        <div className="row g-4">
          {records.map((record, index) => {
            const IconComponent = record.icon;
            return (
              <div key={index} className="col-12 col-md-6">
                <Link to={record.link} className="text-decoration-none">
                  <div className="glass-card p-5 h-100 text-center position-relative shadow-sm border-0 border-top border-primary border-3">
                    <div className={`bg-${record.color} bg-opacity-10 rounded-circle p-4 d-inline-flex mb-4`}>
                      <IconComponent size={50} className={`text-${record.color}`} />
                    </div>
                    <h3 className="fw-bold text-dark mb-3">{record.title}</h3>
                    <p className="text-secondary mb-4">{record.description}</p>
                    <span className={`btn btn-${record.color} btn-modern d-inline-flex align-items-center gap-2 shadow-sm`}>
                      {record.count}
                      <ArrowRight size={18} />
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
