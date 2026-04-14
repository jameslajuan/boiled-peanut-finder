import { useLocation, Link } from 'react-router-dom';
import { useSuppliers } from '../data/suppliers';
import { Phone, PlusCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function Navbar() {
  const location = useLocation();
  const { suppliers } = useSuppliers();

  const currentCityData = useMemo(() => {
    // URL: /locations/charleston-sc -> split gives ["", "locations", "charleston-sc"]
    const parts = location.pathname.split('/');
    const slug = parts[2]; 
    return suppliers.find(s => s.slug === slug) || suppliers[0];
  }, [location, suppliers]);

  const displayPhone = currentCityData?.navphone || "Get Peanuts";

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 z-[100] px-4">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        <Link to="/locations" target="_top" className="flex items-center gap-2 no-underline">
          <span className="text-2xl font-black text-[#451A03]">
            The Dirty Peanut
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="https://link.gohighlevel.com/widget/form/YOUR_GHL_FORM_ID"
            target="_top"
            className="hidden sm:flex items-center gap-2 text-[#451A03] font-bold no-underline hover:text-[#F59E0B]"
          >
            <PlusCircle size={20} />
            <span>Add Your Stand</span>
          </a>

          <a
            href={`tel:${displayPhone}`}
            target="_top"
            className="flex items-center gap-2 bg-[#F59E0B] text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-orange-100 transition-all hover:scale-105 no-underline"
          >
            <Phone size={18} fill="currentColor" />
            <span>{displayPhone}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
