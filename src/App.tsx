import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import GenderPage from './pages/GenderPage';
import MetalPage from './pages/MetalPage';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:metalType" element={<HomePage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/gender/:type" element={<GenderPage />} />
        <Route path="/metal/:type" element={<MetalPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}
