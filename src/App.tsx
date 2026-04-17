import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import LocationPage from './pages/LocationPage';

export default function App() {
  const { loading, error } = useSuppliers();

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#FCFAF7]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#451A03] font-black animate-pulse uppercase tracking-widest">Finding Peanuts...</p>
      </div>
    </div>
  );

  if (error) return <div className="h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            {/* Using HashRouter, paths will look like /#/locations */}
            <Route path="/" element={<Navigate to="/locations" replace />} />
            <Route path="/locations" element={<Index />} />
            <Route path="/locations/:slug" element={<LocationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
