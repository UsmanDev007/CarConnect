import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
  
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { MagicCard } from "../../components/ui/magic-card";
import { Car } from "lucide-react";

const Login = () => {
   
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // We pass "admin" to tell the hook to hit /api/admin/login
    const { login } = useAuth("admin"); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            // On success, hook has already saved role: 'admin' and token
            navigate('/admin/dashboard');
        } catch (err) {
            // Check if backend sent a specific error message
            setError(err.response?.data?.message || 'Invalid Admin Credentials');
        } finally {
            setLoading(false);
        }
    };
    
  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* LEFT SIDE: Visual Attraction Section */}
      <div className="hidden lg:flex w-7/12 relative flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Top Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Car size={18} />
            </div>
            CAR<span className="text-blue-500">CONNECT</span>
          </div>
        </div>

        {/* Attractive Text Section */}
        <div className="relative z-10 max-w-xl">
          <h2 className="text-6xl font-extrabold tracking-tighter leading-none mb-6">
            COMMAND THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              INVENTORY.
            </span>
          </h2>
          <p className="text-slate-100 text-lg leading-relaxed max-w-md">
            Manage your premium vehicle listings, track performance, and oversee dealer activities from a single, high-performance interface.
          </p>
        </div>

        {/* Bottom Stats Insight */}
        <div className="relative z-10 flex gap-10">
          <div>
            <p className="text-2xl font-bold">500+</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Active Listings</p>
          </div>
          <div>
            <p className="text-2xl font-bold">120+</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Global Dealers</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Login Box */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-8 relative">
        {/* Subtle background glow for the form side */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full" />

        <Card className="w-full max-w-sm border-none p-0 shadow-2xl bg-transparent z-10">
          <MagicCard
            gradientColor="#2563eb" 
            gradientOpacity={0.3}
            className="p-0 border border-slate-800 bg-slate-900/80 backdrop-blur-md"
          >
            <CardHeader className="border-slate-800 border-b p-8">
              <CardTitle className="text-2xl font-bold tracking-tight text-white">System Access</CardTitle>
              <CardDescription className="text-slate-400">
                Secure gateway for platform administrators.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="p-8 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    className="bg-slate-950/50 border-slate-700 text-white h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password tracking-tight">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-slate-950/50 border-slate-700 text-white h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-2 rounded">
                    <p className="text-red-500 text-xs text-center">{error}</p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="border-slate-800 border-t p-8">
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-bold transition-all active:scale-95"
                >
                  {loading ? "Verifying..." : "Initialize Session"}
                </Button>
              </CardFooter>
            </form>
          </MagicCard>
        </Card>
      </div>
    </div>
  );
};

export default Login;
// i will marquee of magic ui in user login page