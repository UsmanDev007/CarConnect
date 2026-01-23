import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car, User, Mail, Lock, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "../../hooks/useAuth";

const DealerRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(
        "dealer",
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
      );
      setSucess(true);
      navigate("/dealer/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050810] text-white font-sans overflow-hidden">
      {/* LEFT SIDE: Visual Brand Section (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 transition-transform duration-[10s] hover:scale-110')] bg-cover bg-center opacity-40 shadow-inner" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-transparent to-[#050810]/80" />
        </div>

        <div
          className="relative z-10 flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Car size={18} />
          </div>
          CAR<span className="text-blue-500">CONNECT</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter leading-tight mb-4 uppercase italic">
            Scale your <br />
            <span className="text-blue-500">Dealership.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md border-l-2 border-blue-600 pl-4">
            Join our premium network of global dealers. List your inventory and
            reach thousands of buyers instantly.
          </p>
        </div>

        <div className="relative z-10 text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">
          Dealer Management System v2.0
        </div>
      </div>

      {/* RIGHT SIDE: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/5 blur-[120px] rounded-full" />

        <Card className="w-full max-w-md border-white/5 bg-slate-950/40 backdrop-blur-xl shadow-2xl z-10">
          <CardHeader className="space-y-1 p-8 text-center border-b border-white/5">
            <CardTitle className="text-2xl font-bold tracking-tight text-white uppercase italic">
              Dealer Onboarding
            </CardTitle>
            <CardDescription className="text-slate-500">
              Create your business account to start listing.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-8 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs text-center animate-shake">
                  {error}
                </div>
              )}
              {sucess && (
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl text-green-400 text-xs text-center animate-shake">
                  Registered Successfully
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-slate-400 text-[10px] uppercase font-bold tracking-widest"
                  >
                    Dealership Name
                  </Label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-slate-500"
                      size={16}
                    />
                    <Input
                      id="name"
                      placeholder="Premium Motors"
                      className="bg-white/[0.03] border-white/10 pl-10 h-11 text-white focus:ring-blue-500/20"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-400 text-[10px] uppercase font-bold tracking-widest"
                  >
                    Business Email
                  </Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-slate-500"
                      size={16}
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@dealer.com"
                      className="bg-white/[0.03] border-white/10 pl-10 h-11 text-white focus:ring-blue-500/20"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-slate-400 text-[10px] uppercase font-bold tracking-widest"
                    >
                      Contact No.
                    </Label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-3 text-slate-500"
                        size={16}
                      />
                      <Input
                        id="phone"
                        placeholder="+1..."
                        className="bg-white/[0.03] border-white/10 pl-10 h-11 text-white focus:ring-blue-500/20"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-slate-400 text-[10px] uppercase font-bold tracking-widest"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-3 text-slate-500"
                        size={16}
                      />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••"
                        className="bg-white/[0.03] border-white/10 pl-10 h-11 text-white focus:ring-blue-500/20"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-0 flex flex-col gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-white font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "CREATE DEALER ACCOUNT"
                )}
              </Button>

              <div className="text-center">
                <p className="text-slate-500 text-sm font-medium">
                  Already a partner?{" "}
                  <Link
                    to="/dealer/login"
                    className="text-blue-500 hover:text-blue-400 font-bold transition-colors"
                  >
                    Login Here
                  </Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DealerRegister;
