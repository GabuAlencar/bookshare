import Layout from "../../components/Layout";

export default function RecordsPage() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Lista de Cadastros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border rounded p-4">Card Exemplo</div>
        <div className="border rounded p-4">Card Exemplo</div>
      </div>
    </Layout>
  );
}
