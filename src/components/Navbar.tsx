import { useLocation, Link } from 'react-router-dom';
import { useSuppliers } from '../data/suppliers';
import { Phone, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const { suppliers } = useSuppliers();
  const location = useLocation();

  // Simple logic for the build test
  const displayPhone = suppliers.length > 0 ? suppliers[0].navphone : "Get Peanuts Now";

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 z-[100] px-4">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#451A03]">
          BoiledPeanutFinder
        </Link>
        
        <div className="flex gap-4">
          <a href={`tel:${displayPhone}`} className="bg-[#F59E0B] text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold">
            <Phone size={18} />
            <span>{displayPhone}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
