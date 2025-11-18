import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { authFetch } from "../../utils/api";
import { 
  ShieldCheck, 
  XCircleFill, 
  Activity,
  CheckCircleFill
} from "react-bootstrap-icons";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await authFetch("http://localhost:5000/api/protected");
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message);
          setError(false);
        } else {
          setMessage("Acesso negado");
          setError(true);
        }
      } catch (err) {
        setMessage("Erro ao carregar dados");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Layout>
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="glass-card p-5 text-center">
              <div className="mb-4">
                {loading ? (
                  <Activity size={60} className="text-primary" style={{ animation: "spin 1s linear infinite" }} />
                ) : error ? (
                  <XCircleFill size={60} className="text-danger" />
                ) : (
                  <CheckCircleFill size={60} className="text-success" />
                )}
              </div>
              
              <h1 className="fw-bold text-primary mb-4">
                <ShieldCheck className="me-2" size={32} />
                Dashboard
              </h1>
              
              {loading ? (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                  <span className="text-muted">Carregando...</span>
                </div>
              ) : (
                <div className={`alert ${error ? 'alert-danger' : 'alert-success'} mb-0`} role="alert">
                  <strong>{message}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
