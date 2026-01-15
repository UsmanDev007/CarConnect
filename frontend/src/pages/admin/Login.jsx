import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
        <Card className="w-full max-w-md bg-white shadow-xl border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
            <p className="text-sm text-center text-slate-500">
              Enter your credentials below
            </p>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="admin@carconnect.com"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
