import Layout from "../../components/Layout";

export default function HomePage() {

  const name = localStorage.getItem("name");

  return (
       <Layout>
      {name ? (
        <h2 className="text-2xl font-semibold mb-4">
          Bem-vindo, {name}!
        </h2>
      ) : (
        <h2 className="text-2xl font-semibold mb-4">
          Bem-vindo à Biblioteca
        </h2>
      )}

      <p>Use o menu para navegar entre as páginas.</p>
    </Layout>
  );
}