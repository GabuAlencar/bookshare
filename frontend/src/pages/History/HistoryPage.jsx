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
    <>
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Histórico de Livros Cadastrados</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
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
              <tr key={book.id}>
                  <td className="border px-4 py-2">{book.id}</td>
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">{book.year}</td>
                  <td className="border px-4 py-2">{book.category}</td>
                  <td className="border px-4 py-2 max-w-xs align-top">
                    <p className="whitespace-pre-line break-words">
                      {expandedDescriptions[book.id]
                        ? book.description
                        : book.description?.substring(0, 100) + (book.description?.length > 100 ? "..." : "")}
                    </p>
                    {book.description?.length > 100 && (
                      <button
                        onClick={() => toggleDescription(book.id)}
                        className="text-blue-600 text-sm hover:underline mt-1"
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
                <td colSpan="3" className="text-center py-4">
                Nenhum livro encontrado.
                </td>
            </tr>
          )}
        </tbody>
      </table>
   

    
      <h2 className="text-2xl font-semibold mt-6">Histórico de Clientes Cadastrados</h2>
      <table className="w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-200">
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
              <tr key={client.id}>
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
                <td colSpan="3" className="text-center py-4">
                Nenhum Cliente encontrado.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
    </>
  );
}
