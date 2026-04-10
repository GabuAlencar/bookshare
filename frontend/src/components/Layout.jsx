import Navbar from "./Navbar";
import { Journal } from "react-bootstrap-icons";

export default function Layout({ children }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1 container-fluid px-4 py-5 mt-5 fade-in">
        {children}
      </main>
      <footer className="text-center py-4 mt-auto border-top border-secondary">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className="text-secondary fw-semibold">
            &copy; {new Date().getFullYear()} BookShare
          </span>
          <Journal className="text-secondary" size={20} />
        </div>
      </footer>
    </div>
  );
}
