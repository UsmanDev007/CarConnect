import React from "react";
import { Link } from "react-router-dom";
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { name: "All Cars", path: "/user/cars" },
      { name: "Used Cars", path: "/user/used-cars" },
      { name: "Featured Listings", path: "/user/home" },
      { name: "Verified Dealers", path: "/dealers" },
    ],
    support: [
      { name: "Help Center", path: "/help" },
      { name: "Safety Tips", path: "/safety" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Car size={18} className="text-white" />
              </div>
              <span className="text-white uppercase italic">
                CAR<span className="text-blue-500 font-black">CONNECT</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Pakistan's most advanced automotive dashboard for buyers and sellers. 
              Bridging the gap with verified data and biometric security.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-blue-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-blue-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-blue-500 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: MARKETPLACE */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Marketplace</h4>
            <ul className="space-y-4">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-400 text-sm transition-colors flex items-center gap-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-blue-500 mt-0.5" />
                <span className="text-slate-500">DHA Phase 6, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-blue-500" />
                <span className="text-slate-500">+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-blue-500" />
                <span className="text-slate-500">support@carconnect.pk</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest">
            © {currentYear} CarConnect. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[10px] text-slate-600 uppercase tracking-widest cursor-pointer hover:text-slate-400">
              System Status <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </span>
            <span className="text-[10px] text-slate-600 uppercase tracking-widest cursor-pointer hover:text-slate-400 flex items-center gap-1">
              Feedback <ExternalLink size={10} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;