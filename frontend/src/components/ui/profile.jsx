// import React from "react";
// import { User, Mail, ShieldCheck, Save } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "../../hooks/useAuth";

// const ProfileDialog = ({ trigger }) => {
//   const { user } = useAuth();

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         {trigger}
//       </DialogTrigger>
      
//       <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-200">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold italic uppercase tracking-tighter text-white">
//             Account <span className="text-blue-500">Details</span>
//           </DialogTitle>
//           <DialogDescription className="text-slate-500">
//             Manage your personal information and verified status.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-6 py-4">
//           {/* Profile Picture / Avatar placeholder */}
//           <div className="flex justify-center">
//              <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center text-3xl font-black text-blue-500 shadow-lg shadow-blue-500/10">
//                 {user?.name?.[0]?.toUpperCase() || "U"}
//              </div>
//           </div>

//           <div className="grid gap-4">
//             <div className="space-y-1">
//               <Label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Full Name</Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
//                 <Input defaultValue={user?.name} className="pl-10 bg-slate-950 border-slate-800 focus:border-blue-500" />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <Label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
//                 <Input defaultValue={user?.email} className="pl-10 bg-slate-950 border-slate-800 focus:border-blue-500" />
//               </div>
//             </div>
//           </div>

//           <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
//              <ShieldCheck className="text-blue-500" size={20} />
//              <div>
//                 <p className="text-xs font-bold text-white uppercase tracking-tight">Verified Account</p>
//                 <p className="text-[10px] text-slate-500">Trusted CarConnect member</p>
//              </div>
//           </div>
//         </div>

//         <DialogFooter>
//           <Button className="w-full bg-blue-600 hover:bg-blue-500 font-bold gap-2">
//             <Save size={16} /> Save Changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProfileDialog;