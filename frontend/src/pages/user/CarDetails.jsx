import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCars } from '../../hooks/useCars';
import Navbar from '../../components/ui/navbar';
import { Spinner } from '../../components/ui/spinner';
import Footer from '../../components/ui/footer';

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cars } = useCars(); 

  const [car, setCar] = useState(location.state?.car || null);

  useEffect(() => {
    window.scroll(top)
    if (!car && cars) {
      const foundCar = cars.find((c) => c._id === id);
      setCar(foundCar);
    }
  }, [id, car, cars]);

  if (!car) return <Spinner/>

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-32 px-4">
        <button onClick={() => navigate(-1)} className="text-blue-500 mb-8">
          ← Back to Inventory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Images */}
          <div className="space-y-4">
            <img 
              src={car.carImgUrl.frontImg} 
              alt={car.model} 
              className="w-full aspect-video object-cover rounded-3xl border border-white/10" 
            />
            <div className="grid grid-cols-3 gap-4">
               <img src={car.carImgUrl.backImg1} className="rounded-xl aspect-square object-cover" />
               <img src={car.carImgUrl.backImg2} className="rounded-xl aspect-square object-cover" />
               <img src={car.carImgUrl.backImg3} className="rounded-xl aspect-square object-cover" />
            </div>
          </div>

          {/* Right Side: Info */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-black italic uppercase italic">{car.brand} {car.model}</h1>
            <p className="text-3xl text-blue-500 font-bold mt-4">${car.price.toLocaleString()}</p>
            
            <div className="mt-8 p-6 bg-slate-900 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-slate-400">Specifications</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <p><span className="text-slate-500">Year:</span> {car.year}</p>
                <p><span className="text-slate-500">Condition:</span> 10/10</p>
                <p><span className="text-slate-500">Fuel:</span> Petrol</p>
                <p><span className="text-slate-500">Location:</span> Pakistan</p>
              </div>
            </div>

            <p className="mt-8 text-slate-400 leading-relaxed text-lg">
              {car.detail}
            </p>

            <button className="mt-auto w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-tighter text-xl transition-all">
              Book Now
            </button>
          </div>
        </div>
      </div>
       <Footer/>
    </div>
  );
};

export default CarDetails;