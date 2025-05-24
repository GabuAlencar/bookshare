import Layout from "../../components/Layout";

export default function LoginPage() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form className="space-y-4 max-w-sm">
        <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input type="password" placeholder="Senha" className="w-full border rounded px-3 py-2" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
      </form>
    </Layout>
  );
}
