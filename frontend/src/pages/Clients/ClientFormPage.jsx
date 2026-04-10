import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import { 
  People, 
  Person, 
  EnvelopeFill, 
  TelephoneFill, 
  CreditCardFill, 
  GeoAltFill,
  FileText,
  CheckCircleFill,
  XCircleFill,
  Save
} from "react-bootstrap-icons";

export default function ClientFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCPF] = useState("");
  const [address, setAddress] = useState("");
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/clients", {
        name,
        email,
        phone,
        cpf,
        address,
      });

      setMessage("Cliente cadastrado com sucesso!");
      setIsSuccess(true);
      setClientId(response.data.id);

      setName("");
      setEmail("");
      setPhone("");
      setCPF("");
      setAddress("");
    } catch (err) {
      setMessage("Erro ao cadastrar cliente.");
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
                <People size={40} className="text-primary" />
              </div>
              <h2 className="fw-bold text-dark mb-2">Cadastro de Cliente</h2>
              <p className="text-secondary">Preencha os dados do cliente</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FileText size={18} />
                  Código do Cliente
                </label>
                <input
                  type="text"
                  className="form-control form-control-modern bg-light"
                  value={clientId ? `#${String(clientId).padStart(6, "0")}` : "Aguardando cadastro..."}
                  disabled
                />
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <Person size={18} />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-modern"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Luis da Silva"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <EnvelopeFill size={18} />
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-modern"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: luis@email.com"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <TelephoneFill size={18} />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-modern"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: (12) 91234-5678"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <CreditCardFill size={18} />
                    CPF
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-modern"
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                    placeholder="Ex: 123.456.789-00"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <GeoAltFill size={18} />
                    Endereço
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-modern"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: Rua das Flores, 123"
                    required
                  />
                </div>
              </div>

              {message && (
                <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mt-4 mb-0`}>
                  {isSuccess ? <CheckCircleFill size={20} /> : <XCircleFill size={20} />}
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 btn-modern d-flex align-items-center justify-content-center gap-2 mt-4"
              >
                <Save size={18} />
                <span>Cadastrar Cliente</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
