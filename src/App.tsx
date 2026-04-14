import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';
import Navbar from './components/Navbar';
import Index from './pages/Index';

// Placeholder for the City Page we build next
const LocationPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl font-bold text-[#451A03] mb-4">City Directory</h1>
    <p>Loading local peanut stands...</p>
  </div>
);

export default function App() {
  const { loading, error } = useSuppliers();

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="animate-pulse text-[#F59E0B] font-bold text-xl">Loading Peanuts...</div>
    </div>
  );
  
  if (error) return (
    <div className="h-screen w-screen flex items-center justify-center text-red-600 font-bold">{error}</div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-secondary">
        <Navbar />
        <main className="pt-20">
          <Routes>
            {/* Redirect root to /locations */}
            <Route path="/" element={<Navigate to="/locations" replace />} />
            
            {/* The Main Directory Home */}
            <Route path="/locations" element={<Index />} />
            
            {/* The City Pages */}
            <Route path="/locations/:slug" element={<LocationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
