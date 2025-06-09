import Navbar from "../components/Navbar";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="text-center py-4 flex justify-center items-center gap-2">
        <span>&copy; {new Date().getFullYear()} BookShare</span>
          <img src="/book-logo.svg" alt="Book logo" className="w-9 h-9" />
      </footer>
    </div>
  );
}
