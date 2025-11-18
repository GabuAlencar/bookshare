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
      color: "success",
      count: "Ver clientes"
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        <div className="text-center mb-5">
          <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
            <Grid size={50} className="text-primary" />
          </div>
          <h1 className="display-5 fw-bold text-white mb-3">
            Lista de Cadastros
          </h1>
          <p className="lead text-white-50">
            Acesse os registros de livros e clientes
          </p>
        </div>

        <div className="row g-4">
          {records.map((record, index) => {
            const IconComponent = record.icon;
            return (
              <div key={index} className="col-12 col-md-6">
                <Link to={record.link} className="text-decoration-none">
                  <div className="glass-card p-5 h-100 text-center position-relative">
                    <div className={`bg-${record.color} bg-opacity-10 rounded-circle p-4 d-inline-flex mb-4`}>
                      <IconComponent size={50} className={`text-${record.color}`} />
                    </div>
                    <h3 className="fw-bold mb-3">{record.title}</h3>
                    <p className="text-muted mb-4">{record.description}</p>
                    <span className={`btn btn-${record.color} btn-modern d-inline-flex align-items-center gap-2`}>
                      {record.count}
                      <ArrowRight size={18} />
                    </span>
                    <div 
                      className={`position-absolute top-0 end-0 bg-${record.color} bg-opacity-10`} 
                      style={{ width: "120px", height: "120px", borderRadius: "0 20px 0 120px" }} 
                    />
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
