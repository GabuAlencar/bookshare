import Layout from "../../components/Layout";

export default function BorrowBookPage() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Empréstimo/Troca de Livro</h2>
      <form className="space-y-4 max-w-md">
        <select className="w-full border rounded px-3 py-2">
          <option>Selecionar Cliente</option>
        </select>
        <select className="w-full border rounded px-3 py-2">
          <option>Selecionar Livro</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Confirmar</button>
      </form>
    </Layout>
  );
}
