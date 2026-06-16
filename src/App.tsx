import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}
