import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import { 
  Journal, 
  FileText, 
  Calendar, 
  Tag, 
  Type, 
  Person,
  CheckCircleFill,
  XCircleFill,
  Save
} from "react-bootstrap-icons";

export default function BookFormPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [bookId, setBookId] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const parsedYear = parseInt(year, 10);

    if (!parsedYear || parsedYear < 1000 || parsedYear > currentYear) {
      setMessage(`Ano inválido. Informe um valor entre 1000 e ${currentYear}.`);
      setIsSuccess(false);
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
      setMessage("Livro cadastrado com sucesso!");
      setIsSuccess(true);

      setTitle("");
      setAuthor("");
      setYear("");
      setCategory("");
      setDescription("");
    } catch (err) {
      setMessage("Erro ao cadastrar livro.");
      setIsSuccess(false);
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="row justify-content-center fade-in">
        <div className="col-12 col-lg-8">
          <div className="glass-card p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                <Journal size={40} className="text-primary" />
              </div>
              <h2 className="fw-bold text-primary mb-2">Cadastro de Livro</h2>
              <p className="text-muted">Preencha os dados do livro</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FileText size={18} />
                  Código do Livro
                </label>
                <input
                  type="text"
                  className="form-control form-control-modern bg-light"
                  value={bookId ? `#${String(bookId).padStart(6, "0")}` : "Aguardando cadastro..."}
                  disabled
                />
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <Type size={18} />
                    Título
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-modern"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Dom Casmurro"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <Person size={18} />
                    Autor
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-modern"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ex: Machado de Assis"
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mt-0">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <Calendar size={18} />
                    Ano de Publicação
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-modern"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Ex: 1899"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <Tag size={18} />
                    Categoria
                  </label>
                  <select
                    className="form-select form-control-modern"
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
              </div>

              <div className="mb-4 mt-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FileText size={18} />
                  Descrição
                </label>
                <textarea
                  className="form-control form-control-modern"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Escreva uma breve descrição do livro..."
                  required
                />
              </div>

              {message && (
                <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
                  {isSuccess ? <CheckCircleFill size={20} /> : <XCircleFill size={20} />}
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 btn-modern d-flex align-items-center justify-content-center gap-2"
              >
                <Save size={18} />
                <span>Cadastrar Livro</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
