import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { 
  Journal, 
  People, 
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText
} from "react-bootstrap-icons";

export default function HistoryPage() {
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Erro ao buscar livros:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Layout>
      <div className="fade-in">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-white mb-3">
            <FileText className="me-2" size={40} />
            Histórico de Cadastros
          </h1>
          <p className="lead text-white-50">Visualize todos os livros e clientes cadastrados</p>
        </div>

        {/* TABELA DE LIVROS */}
        <div className="glass-card p-4 mb-5">
          <div className="d-flex align-items-center gap-2 mb-4">
            <Journal className="text-primary" size={28} />
            <h2 className="fw-bold text-primary mb-0">Livros Cadastrados</h2>
            <span className="badge bg-primary ms-2">{books.length}</span>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Ano</th>
                  <th>Categoria</th>
                  <th>Descrição</th>
                  <th>Data de Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.id} className="table-hover-row">
                      <td><strong>#{book.id}</strong></td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year}</td>
                      <td>
                        <span className="badge bg-info">{book.category}</span>
                      </td>
                      <td style={{ maxWidth: "300px" }}>
                        <p className="mb-1">
                          {expandedDescriptions[book.id]
                            ? book.description
                            : book.description?.substring(0, 100) + (book.description?.length > 100 ? "..." : "")}
                        </p>
                        {book.description?.length > 100 && (
                          <button
                            onClick={() => toggleDescription(book.id)}
                            className="btn btn-sm btn-link text-primary p-0 d-inline-flex align-items-center gap-1"
                          >
                            {expandedDescriptions[book.id] ? (
                              <>
                                <ChevronUp size={14} />
                                <span>Mostrar menos</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown size={14} />
                                <span>Ler mais</span>
                              </>
                            )}
                          </button>
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Calendar size={14} className="text-muted" />
                          <span>{new Date(book.createdAt).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      <Journal size={40} className="mb-2 opacity-50" />
                      <p className="mb-0">Nenhum livro encontrado.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABELA DE CLIENTES */}
        <div className="glass-card p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <People className="text-success" size={28} />
            <h2 className="fw-bold text-success mb-0">Clientes Cadastrados</h2>
            <span className="badge bg-success ms-2">{clients.length}</span>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>CPF</th>
                  <th>Endereço</th>
                  <th>Data de Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <tr key={client.id} className="table-hover-row">
                      <td><strong>#{client.id}</strong></td>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>{client.cpf}</td>
                      <td>{client.address}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Calendar size={14} className="text-muted" />
                          <span>{new Date(client.createdAt).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      <People size={40} className="mb-2 opacity-50" />
                      <p className="mb-0">Nenhum cliente encontrado.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
