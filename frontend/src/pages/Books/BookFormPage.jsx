// src/pages/BookFormPage.jsx
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BookFormPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [bookId, setBookId] = useState(null);

  // 1) Ao montar, busca o nextId do servidor
  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books/next-id");
        setBookId(res.data.nextId);
      } catch (err) {
        console.error("Erro ao buscar próximo ID:", err);
      }
    };

    fetchNextId();
  }, []);

  // 2) Quando o usuário clica em “Cadastrar Livro”
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz o POST para criar um novo livro
      const response = await axios.post("http://localhost:5000/books", {
        title,
        author,
        year,
        category,
        description,
      });

      // O servidor retorna response.data.id (por exemplo, 17)
      const createdId = response.data.id;

      // Exibe mensagem de sucesso
      setMessage("Livro cadastrado com sucesso!");

      // Limpa os campos de texto
      setTitle("");
      setAuthor("");
      setYear("");
      setCategory("");
      setDescription("");

      // **Atualiza bookId** para createdId + 1 (próximo disponível)
      setBookId(createdId + 1);
    } catch (err) {
      setMessage("Erro ao cadastrar livro.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Cadastro de Livro</h2>

      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        {/* Campo apenas para mostrar o ID (somente leitura) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Livro ID
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={
              bookId
                ? `#${String(bookId).padStart(6, "0")}`
                : "Carregando ID..."
            }
            disabled
          />
        </div>

        <input
          placeholder="Título"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Autor"
          className="w-full border rounded px-3 py-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          placeholder="Ano"
          className="w-full border rounded px-3 py-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <select
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="Realismo">Realismo</option>
          <option value="Ficção">Ficção Científica</option>
          <option value="Romance">Romance</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Suspense">Suspense</option>
        </select>

        <textarea
          placeholder="Descrição"
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar Livro
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-600">{message}</p>
      )}
    </Layout>
  );
}
