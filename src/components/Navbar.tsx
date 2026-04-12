import { useLocation, Link } from 'react-router-dom';
import { useSuppliers } from '../data/suppliers';
import { Phone, PlusCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function Navbar() {
  const location = useLocation();
  const { suppliers } = useSuppliers();

  // Determine the current city based on the URL slug
  // If we are on the home page, it defaults to the first supplier's phone or a generic one
  const currentCityData = useMemo(() => {
    const slug = location.pathname.split('/')[1];
    return suppliers.find(s => s.slug === slug) || suppliers[0];
  }, [location, suppliers]);

  const displayPhone = currentCityData?.navphone || "Call Us";

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 z-[100] px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          target="_top"
          className="flex items-center gap-2 no-underline"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            BoiledPeanutFinder
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Secondary CTA: Add Your Stand */}
          <a
            href="https://link.gohighlevel.com/widget/form/YOUR_GHL_FORM_ID"
            target="_top"
            className="hidden sm:flex items-center gap-2 text-secondary font-semibold hover:opacity-80 transition-all"
          >
            <PlusCircle size={20} />
            <span>Add Your Stand</span>
          </a>

          {/* Primary CTA: Get Peanuts / Dynamic Phone */}
          <a
            href={`tel:${displayPhone}`}
            target="_top"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all"
          >
            <Phone size={18} fill="currentColor" />
            <span>{displayPhone === "Call Us" ? "Get Peanuts Now" : displayPhone}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
