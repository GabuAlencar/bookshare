import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { 
  Journal, 
  People, 
  Calendar,
  ChevronDown,
  FileText,
  Eye,
  CheckCircleFill,
  XCircleFill,
  ClockFill,
  TrashFill
} from "react-bootstrap-icons";

export default function HistoryPage() {
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // 'book' ou 'client'

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => {
        // O backend já retorna o statusEmprestimo
        setBooks(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar livros:", err);
        setBooks([]);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  const handleViewBook = async (book) => {
    setSelectedBook(book);
    try {
      const res = await fetch(`http://localhost:5000/borrow/livro/${book.id}`);
      const historico = await res.json();
      setBorrowHistory(historico);
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
      setBorrowHistory([]);
      setShowModal(true);
    }
  };

  const getStatusBadge = (statusEmprestimo) => {
    switch (statusEmprestimo) {
      case 'disponivel':
        return <span className="badge bg-success">Disponível</span>;
      case 'emprestado':
        return <span className="badge bg-info">Emprestado</span>;
      case 'emprestado_atraso':
        return <span className="badge bg-warning">Emprestado com atraso</span>;
      default:
        return <span className="badge bg-secondary">Desconhecido</span>;
    }
  };

  const getRowClassName = (statusEmprestimo) => {
    if (statusEmprestimo === 'emprestado_atraso') {
      return 'table-warning';
    }
    return '';
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete || !deleteType) return;

    try {
      const url = deleteType === 'book' 
        ? `http://localhost:5000/books/${itemToDelete.id}`
        : `http://localhost:5000/clients/${itemToDelete.id}`;

      const response = await fetch(url, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        // Atualizar a lista correspondente
        if (deleteType === 'book') {
          setBooks(books.filter(b => b.id !== itemToDelete.id));
        } else {
          setClients(clients.filter(c => c.id !== itemToDelete.id));
        }
        setShowDeleteModal(false);
        setItemToDelete(null);
        setDeleteType(null);
      } else {
        alert(data.error || 'Erro ao excluir item');
      }
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert('Erro ao excluir item. Tente novamente.');
    }
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
                  <th>Status</th>
                  <th>Descrição</th>
                  <th>Data de Cadastro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.id} className={getRowClassName(book.statusEmprestimo)}>
                      <td><strong>#{book.id}</strong></td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year}</td>
                      <td>
                        <span className="badge bg-info">{book.category}</span>
                      </td>
                      <td>
                        {getStatusBadge(book.statusEmprestimo)}
                      </td>
                      <td className="text-truncate-cell" style={{ maxWidth: "200px", width: "200px" }}>
                        <div style={{ 
                          overflow: "hidden", 
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "200px"
                        }}>
                          {book.description || "-"}
                        </div>
                        {book.description && book.description.length > 50 && (
                          <button
                            onClick={() => handleViewBook(book)}
                            className="btn btn-sm btn-link text-primary p-0 mt-1 d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "0.875rem" }}
                          >
                            <ChevronDown size={14} />
                            <span>Ler mais</span>
                          </button>
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Calendar size={14} className="text-muted" />
                          <span>{new Date(book.createdAt).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                            onClick={() => handleViewBook(book)}
                          >
                            <Eye size={16} />
                            <span className="d-none d-md-inline">Visualizar</span>
                          </button>
                          <button
                            className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                            onClick={() => handleDeleteClick(book, 'book')}
                          >
                            <TrashFill size={16} />
                            <span className="d-none d-md-inline">Excluir</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
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
                  <th>Ações</th>
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
                      <td>
                        <button
                          className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                          onClick={() => handleDeleteClick(client, 'client')}
                        >
                          <TrashFill size={16} />
                          <span className="d-none d-md-inline">Excluir</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">
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

      {/* Modal de Detalhes do Livro */}
      {showModal && selectedBook && (
        <>
          <div 
            className="modal-backdrop fade show" 
            onClick={() => setShowModal(false)}
            style={{ zIndex: 1040 }}
          ></div>
          <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ zIndex: 1050 }}
          >
            <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold d-flex align-items-center gap-2 flex-wrap">
                    <Journal className="text-white" size={24} />
                    <span className="text-break">{selectedBook.title}</span>
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                {/* Dados do Livro */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 text-primary">Dados do Livro</h6>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <strong>ID:</strong> #{selectedBook.id}
                    </div>
                    <div className="col-12 col-md-6">
                      <strong>Status:</strong> {getStatusBadge(selectedBook.statusEmprestimo)}
                    </div>
                    <div className="col-12 col-md-6">
                      <strong>Título:</strong> <span className="text-break d-inline-block">{selectedBook.title}</span>
                    </div>
                    <div className="col-12 col-md-6">
                      <strong>Autor:</strong> <span className="text-break d-inline-block">{selectedBook.author}</span>
                    </div>
                    <div className="col-12 col-md-6">
                      <strong>Ano:</strong> {selectedBook.year}
                    </div>
                    <div className="col-12 col-md-6">
                      <strong>Categoria:</strong> <span className="badge bg-info">{selectedBook.category}</span>
                    </div>
                    <div className="col-12">
                      <strong>Descrição:</strong>
                      <p className="mt-2 text-break" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                        {selectedBook.description || "Sem descrição disponível."}
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <strong>Data de Cadastro:</strong>{" "}
                      {new Date(selectedBook.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>

                <hr />

                {/* Histórico de Empréstimos */}
                <div>
                  <h6 className="fw-bold mb-3 text-primary">Histórico de Empréstimos</h6>
                  {borrowHistory.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Cliente</th>
                            <th className="d-none d-md-table-cell">Data Solicitação</th>
                            <th className="d-none d-lg-table-cell">Data Aprovação</th>
                            <th>Data Prevista Devolução</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {borrowHistory.map((emprestimo) => {
                            const hoje = new Date();
                            hoje.setHours(0, 0, 0, 0);
                            const dataDevolucao = emprestimo.data_prevista_devolucao 
                              ? new Date(emprestimo.data_prevista_devolucao) 
                              : null;
                            const isAtrasado = emprestimo.status === 'pendente' && dataDevolucao && dataDevolucao < hoje;

                            return (
                              <tr key={emprestimo.id_emprestimo} className={isAtrasado ? 'table-warning' : ''}>
                                <td style={{ minWidth: '120px' }}>
                                  {emprestimo.cliente ? (
                                    <div className="text-break">
                                      <div className="fw-bold" style={{ wordBreak: 'break-word' }}>{emprestimo.cliente.nome}</div>
                                      <small className="text-muted d-block" style={{ wordBreak: 'break-word' }}>{emprestimo.cliente.email}</small>
                                    </div>
                                  ) : (
                                    <span className="text-muted">Cliente não encontrado</span>
                                  )}
                                </td>
                                <td className="d-none d-md-table-cell" style={{ whiteSpace: 'nowrap' }}>
                                  {emprestimo.data_solicitacao ? (
                                    <div className="d-flex align-items-center gap-1">
                                      <Calendar size={14} />
                                      <span>{new Date(emprestimo.data_solicitacao).toLocaleDateString("pt-BR")}</span>
                                    </div>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td className="d-none d-lg-table-cell" style={{ whiteSpace: 'nowrap' }}>
                                  {emprestimo.data_aprovacao ? (
                                    <div className="d-flex align-items-center gap-1">
                                      <Calendar size={14} />
                                      <span>{new Date(emprestimo.data_aprovacao).toLocaleDateString("pt-BR")}</span>
                                    </div>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                  {emprestimo.data_prevista_devolucao ? (
                                    <div className="d-flex align-items-center gap-1 flex-wrap">
                                      <Calendar size={14} />
                                      <span>{new Date(emprestimo.data_prevista_devolucao).toLocaleDateString("pt-BR")}</span>
                                      {isAtrasado && (
                                        <ClockFill size={14} className="text-warning ms-1" />
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                  {emprestimo.status === 'pendente' && isAtrasado ? (
                                    <span className="badge bg-warning" style={{ fontSize: '0.75rem' }}>Emprestado com atraso</span>
                                  ) : emprestimo.status === 'pendente' ? (
                                    <span className="badge bg-info" style={{ fontSize: '0.75rem' }}>Emprestado</span>
                                  ) : emprestimo.status === 'devolvido' ? (
                                    <span className="badge bg-success" style={{ fontSize: '0.75rem' }}>
                                      <CheckCircleFill size={12} className="me-1" />
                                      Devolvido
                                    </span>
                                  ) : (
                                    <span className="badge bg-secondary" style={{ fontSize: '0.75rem' }}>{emprestimo.status}</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="alert alert-info d-flex align-items-center gap-2 flex-wrap">
                      <Journal size={20} />
                      <span>Nenhum empréstimo registrado para este livro.</span>
                    </div>
                  )}
                </div>
              </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary w-100 w-md-auto"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && itemToDelete && (
        <>
          <div 
            className="modal-backdrop fade show" 
            onClick={() => {
              setShowDeleteModal(false);
              setItemToDelete(null);
              setDeleteType(null);
            }}
            style={{ zIndex: 1040 }}
          ></div>
          <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                    <TrashFill size={24} />
                    Confirmar Exclusão
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setItemToDelete(null);
                      setDeleteType(null);
                    }}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-3">
                    Tem certeza que deseja excluir {deleteType === 'book' ? 'o livro' : 'o cliente'}{' '}
                    <strong>
                      {deleteType === 'book' 
                        ? itemToDelete.title 
                        : itemToDelete.name}
                    </strong>?
                  </p>
                  {deleteType === 'book' && itemToDelete.statusEmprestimo !== 'disponivel' && (
                    <div className="alert alert-warning d-flex align-items-center gap-2">
                      <XCircleFill size={20} />
                      <span>Este livro está emprestado e não pode ser excluído.</span>
                    </div>
                  )}
                  <p className="text-muted small mb-0">
                    Esta ação não pode ser desfeita.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setItemToDelete(null);
                      setDeleteType(null);
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger d-flex align-items-center gap-2"
                    onClick={handleConfirmDelete}
                    disabled={deleteType === 'book' && itemToDelete.statusEmprestimo !== 'disponivel'}
                  >
                    <TrashFill size={18} />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
