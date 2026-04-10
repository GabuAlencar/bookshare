import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { 
  JournalBookmark, 
  ArrowLeft, 
  ArrowRight,
  Calendar,
  People,
  Journal,
  CheckCircleFill,
  XCircleFill,
  HandThumbsUp,
  ArrowCounterclockwise
} from "react-bootstrap-icons";

export default function BorrowBookPage() {
  const [clientes, setClientes] = useState([]);
  const [livros, setLivros] = useState([]);
  const [livrosEmprestados, setLivrosEmprestados] = useState([]);

  const [id_usuario, setIdUsuario] = useState("");
  const [id_livro, setIdLivro] = useState("");
  const [data_solicitacao] = useState(() => new Date().toISOString().split("T")[0]);
  const [data_prevista_devolucao, setDataPrevistaDevolucao] = useState("");

  const [id_usuario_dev, setIdUsuarioDev] = useState("");
  const [id_livro_dev, setIdLivroDev] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [mensagemErro, setMensagemErro] = useState(false);

  const [mensagemDevolucao, setMensagemDevolucao] = useState("");
  const [mensagemDevolucaoErro, setMensagemDevolucaoErro] = useState(false);

  const [acaoSelecionada, setAcaoSelecionada] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/clients").then(res => setClientes(res.data));
    axios.get("http://localhost:5000/books").then(res => setLivros(res.data));
  }, []);

  const clienteOptions = clientes.map(c => ({ value: c.id, label: c.name }));
  const livroOptions = livros.filter(l => l.status === "disponivel").map(l => ({ value: l.id, label: l.title }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id_usuario || !id_livro || !data_prevista_devolucao) {
      setMensagem("Preencha todos os campos corretamente.");
      setMensagemErro(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/borrow", {
        id_usuario: Number(id_usuario),
        id_livro: Number(id_livro),
        data_solicitacao,
        data_prevista_devolucao,
      });

      setMensagem("Empréstimo registrado com sucesso!");
      setMensagemErro(false);
      setIdUsuario("");
      setIdLivro("");
      setDataPrevistaDevolucao("");

      const livrosAtualizados = await axios.get("http://localhost:5000/books");
      setLivros(livrosAtualizados.data);
    } catch (err) {
      setMensagem(err.response?.data?.error || "Erro ao registrar empréstimo.");
      setMensagemErro(true);
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    if (!id_usuario_dev || !id_livro_dev) {
      setMensagemDevolucao("Selecione o cliente e o livro.");
      setMensagemDevolucaoErro(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/return", {
        id_usuario: Number(id_usuario_dev),
        id_livro: Number(id_livro_dev),
      });

      setMensagemDevolucao("Livro devolvido com sucesso!");
      setMensagemDevolucaoErro(false);
      
      // Limpar seleções
      setIdLivroDev("");
      
      // Atualizar listas
      const livrosAtualizados = await axios.get("http://localhost:5000/books");
      setLivros(livrosAtualizados.data);
      
      // Atualizar livros emprestados do cliente se ainda houver cliente selecionado
      if (id_usuario_dev) {
        try {
          const res = await axios.get(`http://localhost:5000/borrow/ativos/${id_usuario_dev}`);
          if (res.data.length === 0) {
            setLivrosEmprestados([]);
          } else {
            setLivrosEmprestados(res.data.map(l => ({ value: l.id_livro, label: l.titulo_livro })));
          }
        } catch {
          setLivrosEmprestados([]);
        }
      } else {
        setLivrosEmprestados([]);
      }
    } catch (err) {
      setMensagemDevolucao(err.response?.data?.error || "Erro ao devolver o livro.");
      setMensagemDevolucaoErro(true);
    }
  };

  const handleClienteDevChange = async (opt) => {
    setIdUsuarioDev(opt?.value || "");
    setIdLivroDev("");
    setMensagemDevolucao("");
    setMensagemDevolucaoErro(false);

    if (opt) {
      try {
        const res = await axios.get(`http://localhost:5000/borrow/ativos/${opt.value}`);
        if (res.data.length === 0) {
          setLivrosEmprestados([]);
          setMensagemDevolucao("Este cliente não possui livros emprestados.");
          setMensagemDevolucaoErro(true);
        } else {
          setLivrosEmprestados(res.data.map(l => ({ value: l.id_livro, label: l.titulo_livro })));
        }
      } catch {
        setLivrosEmprestados([]);
        setMensagemDevolucao("Erro ao buscar livros emprestados.");
        setMensagemDevolucaoErro(true);
      }
    }
  };

  return (
    <Layout>
      <div className="row justify-content-center fade-in">
        <div className="col-12 col-lg-8">
          <div className="glass-card p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                <JournalBookmark size={40} className="text-primary" />
              </div>
              <h2 className="fw-bold text-dark mb-2">Gestão de Empréstimos</h2>
              <p className="text-secondary">Gerencie empréstimos e devoluções</p>
            </div>

            {!acaoSelecionada && (
              <div className="text-center">
                <p className="fs-5 text-muted mb-4">Escolha uma ação</p>
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                  <button
                    className="btn btn-primary btn-modern d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm"
                    onClick={() => setAcaoSelecionada("emprestimo")}
                  >
                    <HandThumbsUp size={20} />
                    <span>Fazer Empréstimo</span>
                  </button>
                  <button
                    className="btn btn-outline-primary btn-modern d-flex align-items-center justify-content-center gap-2 px-5 py-3 bg-white"
                    onClick={() => setAcaoSelecionada("devolucao")}
                  >
                    <ArrowCounterclockwise size={20} />
                    <span>Registrar Devolução</span>
                  </button>
                </div>
              </div>
            )}

            {acaoSelecionada === "emprestimo" && (
              <form onSubmit={handleSubmit} className="fade-in">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Journal className="text-success" size={24} />
                  <h4 className="fw-bold text-success mb-0">Fazer Empréstimo</h4>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <People size={18} />
                    Cliente
                  </label>
                  <Select
                    options={clienteOptions}
                    value={clienteOptions.find(opt => opt.value === id_usuario)}
                    onChange={opt => setIdUsuario(opt?.value || "")}
                    placeholder="Selecione um cliente"
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <Journal size={18} />
                    Livro
                  </label>
                  <Select
                    options={livroOptions}
                    value={livroOptions.find(opt => opt.value === id_livro)}
                    onChange={opt => setIdLivro(opt?.value || "")}
                    placeholder="Selecione um livro"
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold d-flex align-items-center gap-2">
                      <Calendar size={18} />
                      Data de Solicitação
                    </label>
                    <input
                      type="date"
                      value={data_solicitacao}
                      disabled
                      className="form-control form-control-modern bg-light"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold d-flex align-items-center gap-2">
                      <Calendar size={18} />
                      Data Prevista de Devolução
                    </label>
                    <input
                      type="date"
                      value={data_prevista_devolucao}
                      onChange={(e) => setDataPrevistaDevolucao(e.target.value)}
                      min={data_solicitacao}
                      required
                      className="form-control form-control-modern"
                    />
                  </div>
                </div>

                {mensagem && (
                  <div className={`alert ${mensagemErro ? 'alert-danger' : 'alert-success'} d-flex align-items-center gap-2 mt-4`}>
                    {mensagemErro ? <XCircleFill size={20} /> : <CheckCircleFill size={20} />}
                    <span>{mensagem}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-success w-100 btn-modern d-flex align-items-center justify-content-center gap-2 mt-4"
                >
                  <CheckCircleFill size={18} />
                  <span>Confirmar Empréstimo</span>
                </button>
              </form>
            )}

            {acaoSelecionada === "devolucao" && (
              <form onSubmit={handleReturn} className="fade-in">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <ArrowCounterclockwise className="text-primary" size={24} />
                  <h4 className="fw-bold text-primary mb-0">Registrar Devolução</h4>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <People size={18} />
                    Cliente
                  </label>
                  <Select
                    options={clienteOptions}
                    value={clienteOptions.find(opt => opt.value === id_usuario_dev)}
                    onChange={handleClienteDevChange}
                    placeholder="Selecione um cliente"
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <Journal size={18} />
                    Livro
                  </label>
                  <Select
                    options={livrosEmprestados}
                    value={livrosEmprestados.find(opt => opt.value === id_livro_dev)}
                    onChange={opt => setIdLivroDev(opt?.value || "")}
                    placeholder="Selecione um livro"
                    isClearable
                    isDisabled={livrosEmprestados.length === 0}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {mensagemDevolucao && (
                  <div className={`alert ${mensagemDevolucaoErro ? 'alert-danger' : 'alert-success'} d-flex align-items-center gap-2 mb-4`}>
                    {mensagemDevolucaoErro ? <XCircleFill size={20} /> : <CheckCircleFill size={20} />}
                    <span>{mensagemDevolucao}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 btn-modern d-flex align-items-center justify-content-center gap-2"
                >
                  <CheckCircleFill size={18} />
                  <span>Confirmar Devolução</span>
                </button>
              </form>
            )}

            {acaoSelecionada && (
              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setAcaoSelecionada("");
                    setMensagem("");
                    setMensagemErro(false);
                    setMensagemDevolucao("");
                    setMensagemDevolucaoErro(false);
                    setIdUsuarioDev("");
                    setIdLivroDev("");
                    setLivrosEmprestados([]);
                  }}
                  className="btn btn-outline-secondary btn-modern d-flex align-items-center justify-content-center gap-2 mx-auto"
                >
                  <ArrowLeft size={18} />
                  <span>Voltar à escolha</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
