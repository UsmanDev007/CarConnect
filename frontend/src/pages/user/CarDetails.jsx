import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCars } from "../../hooks/useCars";
import Navbar from "../../components/ui/navbar";
import { Spinner } from "../../components/ui/spinner";
import Footer from "../../components/ui/footer";
import { useComment } from "../../hooks/useComments";
import { MessageSquare, Send } from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cars } = useCars();
  const [car, setCar] = useState(location.state?.car || null);
  const { comments, loading, error, fetchComments, postComment } = useComment(id);
  const [commentText, setCommentText] = useState("");
  useEffect(()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  useEffect(() => {
    if (!car && cars) {
      const foundCar = cars.find((c) => c._id === id);
      setCar(foundCar);
    }
    if (id) {
      fetchComments(id);
    }
  }, [id, car, cars, fetchComments]);

  const handlePostComment = async () => {
  if (!commentText.trim()) return;

  const payload = { carId:id, text: commentText };
  const result = await postComment(payload);

  if (result.success) setCommentText("");
};

  if (!car) return <Spinner />;

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
              <img
                src={car.carImgUrl.backImg1}
                className="rounded-xl aspect-square object-cover"
              />
              <img
                src={car.carImgUrl.backImg2}
                className="rounded-xl aspect-square object-cover"
              />
              <img
                src={car.carImgUrl.backImg3}
                className="rounded-xl aspect-square object-cover"
              />
            </div>
          </div>

          {/* Right Side: Info */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-black uppercase italic">
              {car.brand} {car.model}
            </h1>
            <p className="text-3xl text-blue-500 font-bold mt-4">
              ${car.price.toLocaleString()}
            </p>

            <div className="mt-8 p-6 bg-slate-900 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-slate-400">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-4">
                <p>
                  <span className="text-slate-500">Year:</span> {car.year}
                </p>
                <p>
                  <span className="text-slate-500">Condition:</span> 10/10
                </p>
                <p>
                  <span className="text-slate-500">Fuel:</span> Petrol
                </p>
                <p>
                  <span className="text-slate-500">Location:</span> Pakistan
                </p>
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
      {/* COMMENTS SECTION */}
      <div className="max-w-7xl mx-auto px-4 mt-24 mb-32">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
          <MessageSquare className="text-blue-500" size={28} />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            User <span className="text-blue-500">Discussion</span>
            <span className="ml-3 text-xs font-bold text-slate-500 not-italic tracking-widest bg-white/5 px-3 py-1 rounded-full">
              {comments.length}
            </span>
          </h2>
        </div>

        {/* Input Section - Glassmorphism Style */}
        <div className="relative bg-gradient-to-b from-white/5 to-transparent p-[1px] rounded-3xl mb-12">
          <div className="bg-slate-950 rounded-3xl p-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ask a question about this vehicle..."
              className="w-full bg-slate-900/50 text-slate-200 p-5 rounded-2xl resize-none outline-none border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
              rows={3}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePostComment}
                disabled={loading || !commentText.trim()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                {loading ? (
                  "Posting..."
                ) : (
                  <>
                    Post Comment <Send size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-8 text-sm font-bold">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 && !loading ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
              <p className="text-slate-500 italic">
                No questions yet. Start the conversation!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="group bg-slate-900/40 p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar Circle */}
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black text-sm">
                    {comment.user?.name?.[0] || "A"}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-black uppercase italic tracking-tight text-slate-200">
                        {comment.user?.name || "Anonymous"}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        {new Date(comment.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed selection:bg-blue-500/30">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails;
