import Layout from "../../components/Layout";
export default function AboutPage() {
  return (
    <>
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Sobre nós</h2>
      <p className="text-xl font-semibold text-gray-900 mb-2">A BookShare foi desenvolvida para modernizar a gestão de acervos em sebos.</p>
      <p className="text-xl text-gray-900">Nosso sistema é voltado especialmente para proprietários que buscam eficiência, organização e precisão no controle de seus livros. Com uma interface intuitiva para facilitar a atualização constante do catálogo contribuindo para a valorização de cada exemplar.</p>
      <p className="mt-8 text-blue-400">Para mais informações, entre em contato com a nossa equipe:</p>
       <ul className="mt-2"> 
        <li>João – (12) 99120-7890</li>
        <li>Gabriel - (12) 91234-5678</li>
        <li>Isabelle – (12) 99876-5432</li>
       </ul>
    </Layout>
    </>
  );
}
