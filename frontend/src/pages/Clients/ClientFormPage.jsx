// src/pages/ClientFormPage.jsx
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ClientFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCPF] = useState("");
  const [address, setAddress] = useState("");
  const [clientId, setClientId] = useState(null);
  const [message, setMessage] = useState("");

  // 1) Ao montar, busca o nextId do servidor
  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const res = await axios.get("http://localhost:5000/clients/next-id");
        setClientId(res.data.nextId);
      } catch (err) {
        console.error("Erro ao buscar próximo ID de cliente:", err);
      }
    };
    fetchNextId();
  }, []);

  // 2) Quando o usuário clica em “Cadastrar Cliente”
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia o POST para criar um novo cliente
      const response = await axios.post("http://localhost:5000/clients", {
        name,
        email,
        phone,
        cpf,
        address,
      });

      // O servidor retorna response.data.id (por ex. 17)
      const createdId = response.data.id;

      setMessage("Cliente cadastrado com sucesso!");
      setClientId(createdId + 1); // Atualiza para o próximo ID já
      // Limpa os campos de formulário
      setName("");
      setEmail("");
      setPhone("");
      setCPF("");
      setAddress("");
    } catch (err) {
      setMessage("Erro ao cadastrar cliente.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Cadastro do Cliente</h2>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        {/* Campo apenas para mostrar o ID (somente leitura) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cliente ID
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={
              clientId
                ? `#${String(clientId).padStart(6, "0")}`
                : "Carregando ID..."
            }
            disabled
          />
        </div>

        <input
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Telefone"
          className="w-full border rounded px-3 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          placeholder="CPF"
          className="w-full border rounded px-3 py-2"
          value={cpf}
          onChange={(e) => setCPF(e.target.value)}
          required
        />

        <input
          placeholder="Endereço"
          className="w-full border rounded px-3 py-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar Cliente
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-600">{message}</p>
      )}
    </Layout>
  );
}
