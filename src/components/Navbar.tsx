import { Link, useLocation } from 'react-router-dom';
import { Phone, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-orange-100 z-[100] px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Link to="/locations" className="no-underline">
          <span className="text-2xl font-black text-[#451A03] tracking-tighter">
            BoiledPeanuts<span className="text-[#F59E0B]">NearMe</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <a href="https://your-ghl-form-link" target="_top" className="hidden md:flex items-center gap-2 text-[#451A03] font-bold no-underline hover:text-[#F59E0B] transition-colors">
            <PlusCircle size={18} /> Add Stand
          </a>
          <a href="tel:8030000000" className="bg-[#451A03] text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 no-underline hover:bg-black transition-all">
            <Phone size={18} fill="currentColor" /> <span>Call Guide</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
