import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [bookId, setBookId] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar dados do livro se estiver editando
  useEffect(() => {
    if (editId) {
      setIsLoading(true);
      axios.get(`http://localhost:5000/books`)
        .then(res => {
          const book = res.data.find(b => b.id === parseInt(editId));
          if (book) {
            setTitle(book.title || "");
            setAuthor(book.author || "");
            setYear(book.year || "");
            setCategory(book.category || "");
            setDescription(book.description || "");
            setBookId(book.id);
          }
        })
        .catch(err => {
          console.error("Erro ao carregar livro:", err);
          setMessage("Erro ao carregar dados do livro.");
          setIsSuccess(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [editId]);

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
      if (isEditing && editId) {
        // Atualizar livro existente
        await axios.put(`http://localhost:5000/books/${editId}`, {
          title,
          author,
          year,
          category,
          description,
        });

        setMessage("Livro atualizado com sucesso!");
        setIsSuccess(true);
      } else {
        // Criar novo livro
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
      }
    } catch (err) {
      setMessage(isEditing ? "Erro ao atualizar livro." : "Erro ao cadastrar livro.");
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
              <h2 className="fw-bold text-primary mb-2">{isEditing ? "Editar Livro" : "Cadastro de Livro"}</h2>
              <p className="text-muted">{isEditing ? "Atualize os dados do livro" : "Preencha os dados do livro"}</p>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-3 text-muted">Carregando dados do livro...</p>
              </div>
            ) : (
            <form onSubmit={handleSubmit}>
              {isEditing && (
                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <FileText size={18} />
                    Código do Livro
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-modern bg-light"
                    value={bookId ? `#${String(bookId).padStart(6, "0")}` : ""}
                    disabled
                  />
                </div>
              )}
              {!isEditing && (
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
              )}

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
                <span>{isEditing ? "Atualizar Livro" : "Cadastrar Livro"}</span>
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
