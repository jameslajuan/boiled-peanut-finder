import { Link } from 'react-router-dom';
import { useSuppliers } from '../data/suppliers';
import { MapPin, ChevronRight, Flame, Utensils, Truck, Star } from 'lucide-react';

export default function Index() {
  const { suppliers } = useSuppliers();

  // Get unique cities from our Google Sheet data to show as "Launch Cities"
  const cities = Array.from(new Set(suppliers.map(s => s.slug))).map(slug => {
    return suppliers.find(s => s.slug === slug);
  });

  const cravings = [
    { label: "Craving Cajun & Spicy", tag: "cajun", icon: <Flame className="text-red-500" /> },
    { label: "Classic Original Salted", tag: "classic", icon: <Star className="text-yellow-500" /> },
    { label: "Need Bulk / Wholesale", tag: "bulk", icon: <Utensils className="text-brown-600" /> },
    { label: "Mail Order & Shipping", tag: "shipping", icon: <Truck className="text-blue-500" /> },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1599599810878-98926978433d?auto=format&fit=crop&q=80&w=1600" 
            alt="Boiled Peanuts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            The Best <span className="text-primary">Boiled Peanuts</span> Near You.
          </h1>
          <p className="text-xl text-gray-200 mb-10">
            Roadside stands, farm-fresh makers, and secret spicy recipes.
          </p>
          
          {/* Craving Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {cravings.map((item) => (
              <button 
                key={item.tag}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 transition-all group"
              >
                <div className="bg-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-white font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LAUNCH CITIES SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-black text-secondary mb-12 flex items-center gap-3">
          <MapPin className="text-primary" />
          Find Peanuts by City
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map((city) => (
            city && (
              <Link 
                key={city.slug} 
                to={`/${city.slug}`}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <img 
                  src={city.city_hero_image || "https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&q=80&w=800"} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={city.slug}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black text-white capitalize">{city.slug.replace('-', ' ')}</h3>
                  <div className="flex items-center text-primary font-bold mt-2">
                    Browse Stands <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
      </section>
    </div>
  );
}
