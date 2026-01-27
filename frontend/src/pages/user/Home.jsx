import Navbar from "../../components/ui/navbar";
import {
  Users,
  Store,
  Car,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {MarqueeDemo} from "../../components/ui/marque-demo";
import Footer from "../../components/ui/footer";

const Home = () => {
  // Hardcoded Stats
  const stats = [
    { label: "Active Buyers", value: "48k+", icon: <Users size={20} /> },
    { label: "Verified Dealers", value: "1.2k+", icon: <Store size={20} /> },
    { label: "Premium Cars", value: "9.5k+", icon: <Car size={20} /> },
  ];

  // Hardcoded Car Listings (Pakistani Context)
  const cars = [
    {
      id: 1,
      name: "Honda Civic RS",
      price: "9,800,000",
      year: "2024",
      location: "Lahore",
      img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=600",
    },
    {
      id: 2,
      name: "Toyota Fortuner Legender",
      price: "18,500,000",
      year: "2023",
      location: "Islamabad",
      img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600",
    },
    {
      id: 3,
      name: "Hyundai Tucson",
      price: "8,200,000",
      year: "2024",
      location: "Karachi",
      img: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=600",
    },
    {
      id: 1,
      name: "Honda Civic RS",
      price: "9,800,000",
      year: "2024",
      location: "Lahore",
      img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=600",
    },
    {
      id: 2,
      name: "Toyota Fortuner Legender",
      price: "18,500,000",
      year: "2023",
      location: "Islamabad",
      img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600",
    },
    {
      id: 3,
      name: "Hyundai Tucson",
      price: "8,200,000",
      year: "2024",
      location: "Karachi",
      img: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=600",
    },
  ];


  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Pakistan's #1 Secure Auto Hub
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white italic uppercase">
              Drive The <span className="text-blue-500">Standard.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg">
              A premium marketplace for verified dealers and serious buyers.
              Experience the dashboard-driven approach to automotive trading.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-500 h-12 px-8 rounded-lg font-bold">
                Explore Inventory
              </Button>
              <Button
                variant="outline"
                className="border-white/10 bg-white/5 h-12 px-8 rounded-lg font-bold"
              >
                Sell Your Car
              </Button>
            </div>
          </div>

          {/* STATS STRIP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {stats.map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{s.value}</h3>
                  <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FEATURED CARS SECTION */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-white uppercase italic">
                Featured Listings
              </h2>
              <p className="text-slate-500 mt-2">
                Hand-picked premium vehicles from verified partners.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car.id}
                className="group rounded-2xl overflow-hidden bg-slate-900 border border-white/5 hover:border-blue-500/50 transition-all"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded text-xs font-bold text-white uppercase">
                    {car.year}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{car.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin size={14} className="text-blue-500" />{" "}
                    {car.location}, Pakistan
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-xl font-black text-blue-500">
                      $ {car.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white uppercase italic">Common Queries</h2>
            <p className="text-slate-500 mt-2 font-medium">Everything you need to know about CarConnect Pakistan.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do I know if a dealer is verified?",
                a: "All verified dealers carry a 'Blue Check' badge on their profile. This means we have physically verified their showroom location and business registration in cities like Lahore, Karachi, and Islamabad."
              },
              {
                q: "Are the car prices negotiable?",
                a: "Prices are set by the dealers or individual sellers. You can use the 'Connect' button to chat directly with them and discuss the final offer."
              },
              {
                q: "What documents are required for a transfer?",
                a: "For a smooth transfer in Pakistan, you'll generally need the original Smart Card, a valid CNIC copy of both parties, and a signed Biometric verification through the excise system."
              },
              {
                q: "Can I list my car for free?",
                a: "Yes! Individual users can list up to two vehicles for free. Dealers have access to premium subscription plans for bulk listings and dashboard analytics."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {faq.q}
                  </h3>
                  <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 text-xl font-bold">
                    +
                  </div>
                </div>
                <p className="mt-4 text-slate-400 leading-relaxed text-sm hidden group-hover:block animate-in fade-in duration-500">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 3. TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MarqueeDemo/>
        </div>
      </section>

      {/* FOOTER PREVIEW */}
      <Footer/>
    </div>
  );
};

export default Home;
