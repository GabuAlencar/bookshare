import Navbar from "../components/Navbar";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-100 text-center py-4">
        &copy; {new Date().getFullYear()} BookShare
      </footer>
    </div>
  );
}
