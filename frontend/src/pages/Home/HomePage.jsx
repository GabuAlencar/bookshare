import Layout from "../../components/Layout";

export default function HomePage() {

  const name = localStorage.getItem("name");

  return (
    <Layout>

        {name && (
          <h2 className="mt-8 text-3xl text-gray-800 font-bold">Bem-vindo, {name}!</h2>
        )}

        <br />
        <br />
      
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Cadastre um livro <br /> & organize seu acervo com facilidade
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md">
          Sem complicações. Gestão rápida e eficiente. <br />
          Encontre, registre e acompanhe cada título com precisão.
        </p>

    </Layout>
  );
}