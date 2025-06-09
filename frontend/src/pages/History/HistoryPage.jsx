import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

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
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          Histórico de Cadastros
        </h1>

        {/* TABELA DE LIVROS */}
        <h2 className="text-2xl font-semibold mb-4 text-left">Livros Cadastrados</h2>
        <div className="overflow-x-auto rounded-lg shadow mb-12">
          <table className="w-full table-auto border-collapse text-sm bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Título</th>
                <th className="border px-4 py-2">Autor</th>
                <th className="border px-4 py-2">Ano</th>
                <th className="border px-4 py-2">Categoria</th>
                <th className="border px-4 py-2">Descrição</th>
                <th className="border px-4 py-2">Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{book.id}</td>
                    <td className="border px-4 py-2">{book.title}</td>
                    <td className="border px-4 py-2">{book.author}</td>
                    <td className="border px-4 py-2">{book.year}</td>
                    <td className="border px-4 py-2">{book.category}</td>
                    <td className="border px-4 py-2 text-left max-w-xs">
                      <p className="whitespace-pre-line break-words">
                        {expandedDescriptions[book.id]
                          ? book.description
                          : book.description?.substring(0, 100) + (book.description?.length > 100 ? "..." : "")}
                      </p>
                      {book.description?.length > 100 && (
                        <button
                          onClick={() => toggleDescription(book.id)}
                          className="text-blue-600 text-xs hover:underline mt-1"
                        >
                          {expandedDescriptions[book.id] ? "Mostrar menos" : "Ler mais"}
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(book.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Nenhum livro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABELA DE CLIENTES */}
        <h2 className="text-2xl font-semibold mb-4 text-left">Clientes Cadastrados</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto border-collapse text-sm bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Nome</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Telefone</th>
                <th className="border px-4 py-2">CPF</th>
                <th className="border px-4 py-2">Endereço</th>
                <th className="border px-4 py-2">Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{client.id}</td>
                    <td className="border px-4 py-2">{client.name}</td>
                    <td className="border px-4 py-2">{client.email}</td>
                    <td className="border px-4 py-2">{client.phone}</td>
                    <td className="border px-4 py-2">{client.cpf}</td>
                    <td className="border px-4 py-2">{client.address}</td>
                    <td className="border px-4 py-2">
                      {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
