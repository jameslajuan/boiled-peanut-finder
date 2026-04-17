import { Link } from 'react-router-dom';
import { useSuppliers } from '../data/suppliers';
import { MapPin, ChevronRight, Flame, Star } from 'lucide-react';

export default function Index() {
  const { suppliers } = useSuppliers();
  const cities = Array.from(new Set(suppliers.map(s => s.slug))).map(slug => suppliers.find(s => s.slug === slug));

  return (
    <div className="flex flex-col">
      <section className="relative h-[85vh] flex items-center justify-center bg-[#451A03] px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1599599810878-98926978433d?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#451A03]/80 via-[#451A03]/40 to-[#FCFAF7]"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-block bg-[#F59E0B] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">Columbia & The Midlands Edition</div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
            Salty. Spicy. <br/><span className="text-[#F59E0B]">Perfect.</span>
          </h1>
          <p className="text-xl text-stone-200 font-medium mb-10">Find the best local roadside peanut stands in the 803.</p>
          <div className="flex justify-center gap-4">
             <a href="#browse" className="bg-[#F59E0B] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-all no-underline">Find a Stand</a>
          </div>
        </div>
      </section>

      <section id="browse" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-black text-[#451A03] mb-12 flex items-center gap-3 italic">
          <MapPin className="text-[#F59E0B]" size={36} /> Browse by City
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map(city => city && (
            <Link key={city.slug} to={`/locations/${city.slug}`} className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-2xl no-underline">
              <img src={city.city_hero_image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-duration-700" alt={city.slug} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#451A03] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-black text-white capitalize m-0">{city.slug.replace('-', ' ')}</h3>
                <div className="flex items-center text-[#F59E0B] font-bold mt-2 uppercase tracking-widest text-sm">See {suppliers.filter(s => s.slug === city.slug).length} Stands <ChevronRight size={18} /></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
