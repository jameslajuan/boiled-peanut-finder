import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';
import Navbar from './components/Navbar';
import Index from './pages/Index'; // <--- New Import

const LocationPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl font-bold text-[#451A03] mb-4">City Directory</h1>
    <p>We'll build the listings here next!</p>
  </div>
);

export default function App() {
  const { loading, error } = useSuppliers();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-secondary">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:slug" element={<LocationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
