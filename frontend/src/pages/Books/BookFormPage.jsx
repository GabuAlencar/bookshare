import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";

export default function BookFormPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [bookId, setBookId] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const parsedYear = parseInt(year, 10);

    if (!parsedYear || parsedYear < 1000 || parsedYear > currentYear) {
      setMessage(`❌ Ano inválido. Informe um valor entre 1000 e ${currentYear}.`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/books", {
        title,
        author,
        year,
        category,
        description,
      });

      setBookId(response.data.id);
      setMessage("✅ Livro cadastrado com sucesso!");

      setTitle("");
      setAuthor("");
      setYear("");
      setCategory("");
      setDescription("");
    } catch (err) {
      setMessage("❌ Erro ao cadastrar livro.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 mt-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">Cadastro de Livro</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Código do Livro</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              value={bookId ? `#${String(bookId).padStart(6, "0")}` : "Aguardando cadastro..."}
              disabled
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dom Casmurro"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Autor</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-lg"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Machado de Assis"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Ano de Publicação</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-lg"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ex: 1899"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Categoria</label>
            <select
              className="w-full border rounded px-3 py-2 text-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Realismo">Realismo</option>
              <option value="Ficção Científica">Ficção Científica</option>
              <option value="Romance">Romance</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Suspense">Suspense</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              className="w-full border rounded px-3 py-2 text-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Escreva uma breve descrição do livro..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded transition"
          >
            Cadastrar Livro
          </button>
        </form>

        {message && (
          <p className={`text-center text-lg font-medium ${message.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </Layout>
  );
}
