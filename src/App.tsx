import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import LocationPage from './pages/LocationPage'; // <--- Swap this!

export default function App() {
  const { loading, error } = useSuppliers();

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-[#F59E0B]">Loading Directory...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-secondary">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Navigate to="/locations" replace />} />
            <Route path="/locations" element={<Index />} />
            <Route path="/locations/:slug" element={<LocationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
