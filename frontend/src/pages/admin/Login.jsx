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
    <div className="flex min-h-screen bg-slate-950 text-white font-sans">
      {/* Right Side: The Login Box */}
      <div className="w-full flex items-center justify-center p-8">
        <Card className="w-full max-w-sm border-none p-0 shadow-none bg-transparent">
          <MagicCard
            // Hardcoded dark colors since you aren't using a theme provider
            gradientColor="#262626" 
            gradientOpacity={0.5}
            className="p-0 border border-slate-800 bg-slate-900"
          >
            <CardHeader className="border-slate-800 border-b p-6">
              <CardTitle className="text-2xl font-bold tracking-tight text-white">Admin Login</CardTitle>
              <CardDescription className="text-slate-400">
                Enter system credentials
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-200">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@system.com" 
                    className="bg-slate-950 border-slate-700 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="bg-slate-950 border-slate-700 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              </CardContent>

              <CardFooter className="border-slate-800 border-t p-6">
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Logging in..." : "Sign In"}
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