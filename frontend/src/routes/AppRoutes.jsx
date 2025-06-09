import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/Home/HomePage.jsx';
import LoginPage from '../pages/Auth/LoginPage.jsx';
import RegisterPage from '../pages/Auth/RegisterPage.jsx';
import BookFormPage from '../pages/Books/BookFormPage.jsx';
import BorrowBookPage from '../pages/Borrow/BorrowBookPage.jsx';
import RecordsPage from '../pages/Cadastros/RecordsPage.jsx';
import ClientFormPage from '../pages/Clients/ClientFormPage.jsx';
import HistoryPage from '../pages/History/HistoryPage.jsx';
import AboutPage from '../pages/About/AboutPage.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cadastro-livro" element={<BookFormPage/>} />
            <Route path="/cadastro-cliente" element={<ClientFormPage />} />
            <Route path="/emprestimo" element={<BorrowBookPage />} />
            <Route path="/exibir-cadastros" element={<RecordsPage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
)

export default AppRoutes;