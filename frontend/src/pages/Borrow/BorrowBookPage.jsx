import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function BorrowBookPage() {
  const [clientes, setClientes] = useState([]);
  const [livros, setLivros] = useState([]);
  const [livrosEmprestados, setLivrosEmprestados] = useState([]);

  const [id_usuario, setIdUsuario] = useState("");
  const [id_livro, setIdLivro] = useState("");
  const [data_solicitacao] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [data_prevista_devolucao, setDataPrevistaDevolucao] = useState("");

  const [id_usuario_dev, setIdUsuarioDev] = useState("");
  const [id_livro_dev, setIdLivroDev] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [mensagemErro, setMensagemErro] = useState(false);

  const [mensagemDevolucao, setMensagemDevolucao] = useState("");
  const [mensagemDevolucaoErro, setMensagemDevolucaoErro] = useState(false);

  const [acaoSelecionada, setAcaoSelecionada] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/clients")
      .then(res => setClientes(res.data))
      .catch(err => console.error("Erro ao carregar clientes", err));

    axios.get("http://localhost:5000/books")
      .then(res => setLivros(res.data))
      .catch(err => console.error("Erro ao carregar livros", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id_usuario || !id_livro || !data_prevista_devolucao) {
      setMensagem("Por favor, preencha todos os campos corretamente.");
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

      setMensagem("Empréstimo registrado com sucesso.");
      setMensagemErro(false);
      setIdUsuario("");
      setIdLivro("");
      setDataPrevistaDevolucao("");

      // Atualiza lista de livros no estado
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
      setMensagemDevolucao("Por favor, selecione o cliente e o livro.");
      setMensagemDevolucaoErro(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/return", {
        id_usuario: Number(id_usuario_dev),
        id_livro: Number(id_livro_dev),
      });

      setMensagemDevolucao("Livro devolvido com sucesso.");
      setMensagemDevolucaoErro(false);
      setIdUsuarioDev("");
      setIdLivroDev("");
      setLivrosEmprestados([]);

      // Atualiza lista de livros no estado
      const livrosAtualizados = await axios.get("http://localhost:5000/books");
      setLivros(livrosAtualizados.data);
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
          setMensagemDevolucao("Cliente sem livros emprestados.");
          setMensagemDevolucaoErro(true);
        } else {
          const livrosFormatados = res.data.map(l => ({
            value: l.id_livro,
            label: l.titulo_livro
          }));
          setLivrosEmprestados(livrosFormatados);
        }
      } catch (err) {
        setLivrosEmprestados([]);
        setMensagemDevolucao("Erro ao buscar livros emprestados.");
        setMensagemDevolucaoErro(true);
      }
    }
  };

  const clienteOptions = clientes.map(c => ({ value: c.id, label: c.name }));
  const livroOptions = livros
    .filter(l => l.status === 'disponivel')
    .map(l => ({ value: l.id, label: l.title }));

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-center">Gestão de Livros</h2>

      {!acaoSelecionada && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl text-gray-700 font-medium">O que você deseja fazer?</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded text-lg hover:bg-green-700"
              onClick={() => setAcaoSelecionada("emprestimo")}
            >
              Fazer Empréstimo
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700"
              onClick={() => setAcaoSelecionada("devolucao")}
            >
              Registrar Devolução
            </button>
          </div>
        </div>
      )}

      {acaoSelecionada === "emprestimo" && (
        <form className="space-y-4 max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold text-green-700">Fazer Empréstimo</h3>

          <div>
            <label className="block mb-1 font-semibold">Nome do Cliente</label>
            <Select
              options={clienteOptions}
              value={clienteOptions.find(opt => opt.value === id_usuario)}
              onChange={opt => setIdUsuario(opt?.value || "")}
              placeholder="Selecione o cliente"
              isClearable
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Título do Livro</label>
            <Select
              options={livroOptions}
              value={livroOptions.find(opt => opt.value === id_livro)}
              onChange={opt => setIdLivro(opt?.value || "")}
              placeholder="Selecione o livro"
              isClearable
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Data de Solicitação</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              value={data_solicitacao}
              disabled
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Data de Devolução</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={data_prevista_devolucao}
              onChange={e => setDataPrevistaDevolucao(e.target.value)}
              min={data_solicitacao}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded text-lg"
          >
            Confirmar Empréstimo
          </button>

          {mensagem && (
            <p
              className={`text-center font-medium ${
                mensagemErro ? "text-red-700" : "text-green-800"
              }`}
            >
              {mensagem}
            </p>
          )}
        </form>
      )}

      {acaoSelecionada === "devolucao" && (
        <form className="space-y-4 max-w-md mx-auto mt-8" onSubmit={handleReturn}>
          <h3 className="text-xl font-semibold text-blue-700">Registrar Devolução</h3>

          <div>
            <label className="block mb-1 font-semibold">Nome do Cliente</label>
            <Select
              options={clienteOptions}
              value={clienteOptions.find(opt => opt.value === id_usuario_dev)}
              onChange={handleClienteDevChange}
              placeholder="Selecione o cliente"
              isClearable
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Título do Livro</label>
            <Select
              options={livrosEmprestados}
              value={livrosEmprestados.find(opt => opt.value === id_livro_dev)}
              onChange={opt => setIdLivroDev(opt?.value || "")}
              placeholder="Selecione o livro"
              isClearable
              isDisabled={livrosEmprestados.length === 0}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded text-lg"
          >
            Confirmar Devolução
          </button>

          {mensagemDevolucao && (
            <p
              className={`text-center font-medium ${
                mensagemDevolucaoErro ? "text-red-700" : "text-blue-800"
              }`}
            >
              {mensagemDevolucao}
            </p>
          )}
        </form>
      )}

      {acaoSelecionada && (
        <div className="text-center mt-6">
          <button
            className="text-sm text-gray-600 underline"
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
          >
            Voltar à escolha
          </button>
        </div>
      )}
    </Layout>
  );
}
