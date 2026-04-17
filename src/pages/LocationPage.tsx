import { useParams } from 'react-router-dom';
import { useSuppliers } from '../data/suppliers';
import { MapPin, Phone, Star, Navigation } from 'lucide-react';

export default function LocationPage() {
  const { slug } = useParams();
  const { suppliers } = useSuppliers();
  const cityStands = suppliers.filter(s => s.slug === slug).sort((a, b) => (a.isPremium === b.isPremium ? 0 : a.isPremium ? -1 : 1));

  return (
    <div className="min-h-screen pt-20 bg-[#FCFAF7]">
      <div className="bg-[#451A03] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black capitalize mb-6 italic">Best Peanuts in {slug?.replace('-', ' ')}</h1>
          <p className="text-xl text-orange-100/80 max-w-2xl font-medium leading-relaxed">{cityStands[0]?.city_description}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12">
          {cityStands.map((stand, i) => (
            <div key={i} className={`card-listing flex flex-col md:flex-row overflow-hidden ${stand.isPremium ? 'ring-4 ring-[#F59E0B]' : ''}`}>
              <div className="md:w-2/5 h-72 md:h-auto relative">
                <img src={stand.stall_photo} className="w-full h-full object-cover" alt={stand.name} />
                {stand.isPremium && (
                  <div className="absolute top-6 left-6 bg-[#F59E0B] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter flex items-center gap-1 shadow-xl">
                    <Star size={14} fill="currentColor" /> Local Favorite
                  </div>
                )}
              </div>
              <div className="p-10 md:w-3/5 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-black mb-2 text-[#451A03]">{stand.name}</h2>
                  <p className="flex items-center gap-1 text-stone-400 font-bold text-sm mb-6 uppercase tracking-wider"><MapPin size={16} /> {stand.address}</p>
                  <p className="text-stone-600 leading-relaxed mb-8 text-lg">{stand.business_bio}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {stand.flavor_tags.split(',').map(tag => (
                      <span key={tag} className="bg-orange-50 text-[#F59E0B] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-orange-100">#{tag.trim()}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <a href={`tel:${stand.navphone}`} className="bg-[#451A03] text-white btn-utility no-underline hover:bg-black"><Phone size={20} /> CALL</a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stand.address)}`} target="_blank" className="bg-[#F59E0B] text-white btn-utility no-underline hover:shadow-orange-200"><Navigation size={20} /> MAP</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
