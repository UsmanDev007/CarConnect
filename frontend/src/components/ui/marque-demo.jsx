import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee"; 

const reviews = [
  {
    name: "Zohaib Ahmed",
    username: "@zohaib_lhr",
    body: "Found a verified dealer in Lahore for my Sportage. The biometric process was so smooth through the app!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Sana Malik",
    username: "@sana_autohub",
    body: "The only platform in Pakistan that actually verifies the auction sheets. Saved me from buying a flooded car.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Fawad Chaudhry",
    username: "@fawad_v8",
    body: "Sold my Land Cruiser within 3 days. The dealer dashboard analytics helped me price it perfectly for the Karachi market.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Hamza Sheikh",
    username: "@hamza_islamabad",
    body: "Finally a UI that doesn't look like it's from 2005. Best car portal in Pakistan right now, hands down.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Bilal Siddiqui",
    username: "@bilal_dealer",
    body: "As a dealer, managing my inventory from the mobile dashboard is a game changer for my showroom in Multan.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Ayesha Khan",
    username: "@ayesha_drive",
    body: "Bought a Japanese 660cc car. The inspection report provided by CarConnect was 100% accurate. Very satisfied!",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => (
  <figure className={cn(
    "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
    "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]" // Dashboard Theme
  )}>
    <div className="flex items-center gap-2">
      <img src={img} className="rounded-full w-8 h-8" alt="" />
      <div className="flex flex-col">
        <figcaption className="text-sm font-bold text-white">{name}</figcaption>
        <p className="text-xs text-slate-500">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm text-slate-400">{body}</blockquote>
  </figure>
);

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-slate-950 py-10">
      <Marquee pauseOnHover className="[--duration:10s]">
        {firstRow.map((review) => <ReviewCard key={review.username} {...review} />)}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:10s]">
        {secondRow.map((review) => <ReviewCard key={review.username} {...review} />)}
      </Marquee>
      
      {/* Gradients using Slate-950 to match your dashboard theme */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-950" />
    </div>
  );
}