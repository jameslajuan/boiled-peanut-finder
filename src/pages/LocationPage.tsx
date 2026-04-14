import { useParams } from 'react-router-dom';
import { useSuppliers } from '../data/suppliers';
import { MapPin, Star, Tag, Phone, ExternalLink } from 'lucide-react';

export default function LocationPage() {
  const { slug } = useParams();
  const { suppliers } = useSuppliers();

  // 1. Filter and Sort: Premium first, then by Rank
  const cityStands = suppliers
    .filter(s => s.slug === slug)
    .sort((a, b) => {
      if (a.isPremium !== b.isPremium) return a.isPremium ? -1 : 1;
      return a.rank - b.rank;
    });

  if (cityStands.length === 0) {
    return <div className="p-20 text-center">No stands found for this location yet!</div>;
  }

  const cityInfo = cityStands[0]; // Use the first entry to get city-wide info

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CITY HERO */}
      <div className="bg-[#451A03] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black capitalize mb-4">
            Best Boiled Peanuts in {slug?.replace('-', ' ')}
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl leading-relaxed">
            {cityInfo.city_description}
          </p>
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          {cityStands.map((stand, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-3xl overflow-hidden shadow-sm border-2 transition-all ${
                stand.isPremium ? 'border-[#F59E0B] ring-4 ring-orange-50' : 'border-transparent'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Stand Photo */}
                <div className="md:w-1/3 h-64 md:h-auto relative">
                  <img 
                    src={stand.stall_photo || "https://images.unsplash.com/photo-1599599810878-98926978433d?auto=format&fit=crop&q=80&w=600"} 
                    className="w-full h-full object-cover"
                    alt={stand.name}
                  />
                  {stand.isPremium && (
                    <div className="absolute top-4 left-4 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star size={14} fill="white" /> Top Rated
                    </div>
                  )}
                </div>

                {/* Stand Info */}
                <div className="p-8 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-[#451A03]">{stand.name}</h2>
                      <p className="flex items-center gap-1 text-gray-500 mt-1">
                        <MapPin size={16} /> {stand.address}
                      </p>
                    </div>
                    {stand.partnerDiscount && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold border border-green-200">
                        {stand.partnerDiscount}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {stand.business_bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {stand.flavor_tags.split(',').map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a 
                      href={`tel:${stand.navphone}`}
                      className="flex-1 bg-[#451A03] text-white text-center py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                    >
                      <Phone size={18} /> Call Stand
                    </a>
                    <button className="flex-1 border-2 border-[#451A03] text-[#451A03] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                      <MapPin size={18} /> Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
