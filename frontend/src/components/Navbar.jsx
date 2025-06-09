export default function Navbar() {
  return (
    <nav className="bg-blue-900 p-4 text-white relative">
      <div className="container mx-auto flex items-center justify-between relative">
        
        {/* Logo à esquerda */}
        <div className="text-xl font-bold">BookShare</div>

        {/* Navegação centralizada */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          <li><a href="/home" className="hover:underline">Home</a></li>
          <li><a href="/cadastro-livro" className="hover:underline">Livro</a></li>
          <li><a href="/cadastro-cliente" className="hover:underline">Cliente</a></li>
          <li><a href="/emprestimo" className="hover:underline">Empréstimo</a></li>
          <li><a href="/historico" className="hover:underline">Histórico</a></li>
          <li><a href="/sobre" className="hover:underline">Sobre</a></li>
        </ul>

        {/* Sair à direita */}
        <div>
          <a href="/" className="hover:underline">Sair</a>
        </div>

      </div>
    </nav>
  );
}
