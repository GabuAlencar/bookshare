import Layout from "../../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Sobre a BookShare</h1>

        <p className="text-lg text-gray-700 mb-4">
          A <span className="font-semibold text-blue-900">BookShare</span> foi desenvolvida para modernizar a gestão de acervos em sebos.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Nosso sistema é voltado especialmente para proprietários que buscam eficiência, organização e precisão no controle de seus livros. Com uma interface intuitiva, facilitamos a atualização constante do catálogo, contribuindo para a valorização de cada exemplar.
        </p>

        <p className="text-md text-blue-900 mt-6 font-medium">Para mais informações, entre em contato com a nossa equipe:</p>
        
        <ul className="mt-2 text-gray-800">
          <li className="mt-1">João – (12) 99120-7890</li>
          <li className="mt-1">Gabriel – (12) 91234-5678</li>
          <li className="mt-1">Isabelle – (12) 99876-5432</li>
        </ul>
      </div>
    </Layout>
  );
}
