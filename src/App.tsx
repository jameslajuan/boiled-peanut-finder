import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';
import Navbar from './components/Navbar';

/**
 * HOME PAGE COMPONENT (Placeholder)
 * This is the root "/" route.
 */
const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#451A03] mb-4">
        Find the Best Boiled Peanuts
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl">
        The ultimate directory for roadside stands, makers, and resellers. 
        Your next bag of salty, spicy perfection is just a click away.
      </p>
    </div>
  );
};

/**
 * CITY PAGE COMPONENT (Placeholder)
 * This handles the "/:slug" route.
 */
const LocationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-[#451A03] mb-4">City Directory</h1>
      <p className="text-lg text-gray-600">
        Loading the freshest batches for this location...
      </p>
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 * Handles global state (loading/error) and routing.
 */
export default function App() {
  const { loading, error } = useSuppliers();

  // 1. Loading State
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[#F59E0B] font-bold text-xl animate-pulse">
            Loading Peanuts...
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-red-600 font-bold p-10 text-center">
        {error}
      </div>
    );
  }

  // 3. Main Render
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <Navbar />
        {/* Main content area with top padding to clear the fixed Navbar */}
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
