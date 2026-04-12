import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSuppliers } from './data/suppliers';

// Temporary placeholders so the app doesn't crash before we build the pages
const Navbar = () => <nav className="fixed top-0 w-full h-16 bg-secondary text-white flex items-center px-4 z-50">BoiledPeanutFinder.com</nav>;
const Index = () => <div className="p-8 text-center"><h1>Welcome to the Boiled Peanut Finder</h1><p>Home Page Coming Next...</p></div>;
const LocationPage = () => <div className="p-8 text-center"><h1>City Directory</h1><p>City Listings Coming Soon...</p></div>;

function App() {
  const { loading } = useSuppliers();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-primary font-bold text-xl animate-pulse">
          Loading Peanuts...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* pt-20 adds space so the fixed navbar doesn't cover content */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:slug" element={<LocationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
