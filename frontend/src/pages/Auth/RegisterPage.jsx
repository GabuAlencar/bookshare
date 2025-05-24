import Layout from "../../components/Layout";
export default function RegisterPage() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Registro</h2>
      <form className="space-y-4 max-w-sm">
        <input placeholder="Nome" className="w-full border rounded px-3 py-2" />
        <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input type="password" placeholder="Senha" className="w-full border rounded px-3 py-2" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Registrar</button>
      </form>
    </Layout>
  );
}
