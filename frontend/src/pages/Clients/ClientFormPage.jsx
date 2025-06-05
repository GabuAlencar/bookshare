import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";

export default function ClientFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCPF] = useState("");
  const [address, setAddress] = useState("");
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");

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

      setMessage("✅ Cliente cadastrado com sucesso!");
      setClientId(response.data.id);

      setName("");
      setEmail("");
      setPhone("");
      setCPF("");
      setAddress("");
    } catch (err) {
      setMessage("❌ Erro ao cadastrar cliente.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 mt-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">Cadastro de Cliente</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Código do Cliente</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              value={clientId ? `#${String(clientId).padStart(6, "0")}` : "Aguardando cadastro..."}
              disabled
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Luis da Silva"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: luis@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2 text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: (12) 91234-5678"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-lg"
              value={cpf}
              onChange={(e) => setCPF(e.target.value)}
              placeholder="Ex: 123.456.789-00"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Endereço</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ex: Rua das Flores, 123"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded transition"
          >
            Cadastrar Cliente
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
