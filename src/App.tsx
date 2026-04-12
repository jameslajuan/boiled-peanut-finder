import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';
import Navbar from './components/Navbar';

const Index = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl font-bold text-[#451A03] mb-4">Boiled Peanut Finder</h1>
    <p className="text-lg text-gray-600 max-w-2xl">The ultimate directory for roadside stands.</p>
  </div>
);

const LocationPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl font-bold text-[#451A03] mb-4">City Directory</h1>
  </div>
);

export default function App() {
  const { loading, error } = useSuppliers();

  if (loading) return <div className="h-screen w-screen flex items-center justify-center font-sans">Loading Peanuts...</div>;
  
  if (error) return <div className="h-screen w-screen flex items-center justify-center text-red-600 font-sans">{error}</div>;

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
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
