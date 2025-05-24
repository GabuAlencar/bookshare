export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">BookShare</h1>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/cadastro-livro" className="hover:underline">Cadastro Livro</a></li>
          <li><a href="/cadastro-cliente" className="hover:underline">Cadastro Cliente</a></li>
          <li><a href="/emprestimo" className="hover:underline">Empréstimo</a></li>
          <li><a href="/historico" className="hover:underline">Histórico</a></li>
          <li><a href="/sobre" className="hover:underline">Sobre</a></li>
        </ul>
      </div>
    </nav>
  );
}