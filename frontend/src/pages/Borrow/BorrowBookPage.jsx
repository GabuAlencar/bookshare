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
      setMensagem("❌ Preencha todos os campos corretamente.");
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

      setMensagem("✅ Empréstimo registrado com sucesso!");
      setMensagemErro(false);
      setIdUsuario("");
      setIdLivro("");
      setDataPrevistaDevolucao("");

      const livrosAtualizados = await axios.get("http://localhost:5000/books");
      setLivros(livrosAtualizados.data);
    } catch (err) {
      setMensagem(err.response?.data?.error || "❌ Erro ao registrar empréstimo.");
      setMensagemErro(true);
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    if (!id_usuario_dev || !id_livro_dev) {
      setMensagemDevolucao("❌ Selecione o cliente e o livro.");
      setMensagemDevolucaoErro(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/return", {
        id_usuario: Number(id_usuario_dev),
        id_livro: Number(id_livro_dev),
      });

      setMensagemDevolucao("📚 Livro devolvido com sucesso!");
      setMensagemDevolucaoErro(false);
      setIdUsuarioDev("");
      setIdLivroDev("");
      setLivrosEmprestados([]);

      const livrosAtualizados = await axios.get("http://localhost:5000/books");
      setLivros(livrosAtualizados.data);
    } catch (err) {
      setMensagemDevolucao(err.response?.data?.error || "❌ Erro ao devolver o livro.");
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
        setMensagemDevolucao("❌ Erro ao buscar livros emprestados.");
        setMensagemDevolucaoErro(true);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-8 border border-gray-200 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">Gestão de Empréstimos</h2>

        {!acaoSelecionada && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-gray-700 font-medium">Escolha uma ação</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-base font-semibold"
                onClick={() => setAcaoSelecionada("emprestimo")}
              >
                Fazer Empréstimo
              </button>
              <button
                className="bg-blue-900 hover:bg-blue-700 text-white px-5 py-2 rounded text-base font-semibold"
                onClick={() => setAcaoSelecionada("devolucao")}
              >
                Registrar Devolução
              </button>
            </div>
          </div>
        )}

        {acaoSelecionada === "emprestimo" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">Fazer Empréstimo</h3>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Cliente</label>
              <Select
                options={clienteOptions}
                value={clienteOptions.find(opt => opt.value === id_usuario)}
                onChange={opt => setIdUsuario(opt?.value || "")}
                placeholder="Selecione um cliente"
                isClearable
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Livro</label>
              <Select
                options={livroOptions}
                value={livroOptions.find(opt => opt.value === id_livro)}
                onChange={opt => setIdLivro(opt?.value || "")}
                placeholder="Selecione um livro"
                isClearable
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Data de Solicitação</label>
              <input
                type="date"
                value={data_solicitacao}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Data Prevista de Devolução</label>
              <input
                type="date"
                value={data_prevista_devolucao}
                onChange={(e) => setDataPrevistaDevolucao(e.target.value)}
                min={data_solicitacao}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">
              Confirmar Empréstimo
            </button>

            {mensagem && (
              <p className={`text-center font-medium ${mensagemErro ? "text-red-600" : "text-green-700"}`}>
                {mensagem}
              </p>
            )}
          </form>
        )}

        {acaoSelecionada === "devolucao" && (
          <form onSubmit={handleReturn} className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-900">Registrar Devolução</h3>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Cliente</label>
              <Select
                options={clienteOptions}
                value={clienteOptions.find(opt => opt.value === id_usuario_dev)}
                onChange={handleClienteDevChange}
                placeholder="Selecione um cliente"
                isClearable
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Livro</label>
              <Select
                options={livrosEmprestados}
                value={livrosEmprestados.find(opt => opt.value === id_livro_dev)}
                onChange={opt => setIdLivroDev(opt?.value || "")}
                placeholder="Selecione um livro"
                isClearable
                isDisabled={livrosEmprestados.length === 0}
              />
            </div>

            <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-700">
              Confirmar Devolução
            </button>

            {mensagemDevolucao && (
              <p className={`text-center font-medium ${mensagemDevolucaoErro ? "text-red-600" : "text-blue-700"}`}>
                {mensagemDevolucao}
              </p>
            )}
          </form>
        )}

        {acaoSelecionada && (
          <div className="text-center">
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
              className="text-sm text-gray-600 underline mt-4"
            >
              Voltar à escolha
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
