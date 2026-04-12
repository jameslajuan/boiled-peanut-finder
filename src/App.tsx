import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';
import Navbar from './components/Navbar';

// Placeholder components for the pages we will build next
const Index = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl font-bold text-secondary mb-4">Find the Best Boiled Peanuts</h1>
    <p className="text-lg text-gray-600 max-w-2xl">
      The ultimate directory for roadside stands, makers, and resellers. 
      Your next bag of salty, spicy perfection is just a click away.
    </p>
    <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <p className="text-orange-800 font-medium">Home Page logic is loading...</p>
    </div>
  </div>
);

const LocationPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl font-bold text-secondary mb-4">City Directory</h1>
    <p className="text-lg text-gray-600">Filtering the freshest batches for your location...</p>
  </div>
);

function App() {
  const { loading, error } = useSuppliers();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-primary font-bold text-xl animate-pulse">
            Loading Peanuts...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-red-600 font-bold">
        {error}
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        {/* The pt-20 matches the h-20 of the Navbar to prevent overlap */}
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

export default App;
