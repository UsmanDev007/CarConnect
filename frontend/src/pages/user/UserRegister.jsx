import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Car,
  User,
  Mail,
  Lock,
  Phone,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
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

const UserRegister = () => {
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
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(
        "user",
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
      );
      setSuccess(true);
      setTimeout(() => navigate("/user/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Updated Background: Richer, warmer dark tone
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden">
      {/* LEFT SIDE: Kinetic Visuals */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 border-r border-violet-500/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1659769262703-9e9fb9c6682c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGluayUyMGNhcnxlbnwwfDJ8MHx8fDA%3D')] bg-cover bg-center opacity-30 mix-blend-lighten" />
          {/* Cyan/Violet Mesh Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-cyan-500/10" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <Car size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
            CARCONNECT
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="text-7xl font-black italic tracking-tighter leading-none mb-6">
            DRIVE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              FUTURE.
            </span>
          </h2>
          <p className="text-slate-400 text-xl max-w-sm font-light leading-relaxed">
            Secure your spot in the next generation of automotive trading.
          </p>
        </div>

        <div className="relative z-10 flex gap-2">
          <div className="h-1 w-12 bg-violet-500 rounded-full" />
          <div className="h-1 w-4 bg-slate-800 rounded-full" />
          <div className="h-1 w-4 bg-slate-800 rounded-full" />
        </div>
      </div>

      {/* RIGHT SIDE: The Neon Glass Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Big Soft Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-cyan-600/10 blur-[100px] rounded-full" />

        <Card className="w-full max-w-md border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] z-10 overflow-hidden">
          {/* Top accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />

          <CardHeader className="p-10 pb-6">
            <CardTitle className="text-4xl font-extrabold tracking-tight text-white">
              Get Started
            </CardTitle>
            <CardDescription className="text-slate-500 text-base">
              Create your account in seconds.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="px-10 space-y-5">
              {error && (
                <div className="bg-red-500/10 border-l-4 border-red-500 p-3 text-red-400 text-xs font-bold">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="group relative">
                  <Input
                    id="name"
                    placeholder="Full Name"
                    className="bg-slate-900/50 border-white/5 h-14 rounded-2xl focus:border-violet-500/50 focus:ring-violet-500/20 transition-all text-white placeholder:text-slate-600"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="bg-slate-900/50 border-white/5 h-14 rounded-2xl focus:border-violet-500/50 text-white placeholder:text-slate-600"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="phone"
                    placeholder="Phone"
                    className="bg-slate-900/50 border-white/5 h-14 rounded-2xl focus:border-violet-500/50 text-white placeholder:text-slate-600"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="bg-slate-900/50 border-white/5 h-14 rounded-2xl focus:border-violet-500/50 text-white placeholder:text-slate-600"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-10 pt-4 flex flex-col gap-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 h-14 rounded-2xl text-white font-bold text-lg shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-all active:scale-95"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>

              <p className="text-center text-slate-500 text-sm">
                Already have an account?{" "}
                <Link
                  to="/user/login"
                  className="text-violet-400 hover:text-cyan-400 font-bold underline decoration-2 underline-offset-4 transition-all"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UserRegister;
