import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-museum.jpg";
import cardImage from "@/assets/card2_mom_girl_art.jpg";

const Index = () => {
  return (
    <div className="h-[100dvh] flex flex-col relative overflow-hidden">
      {/* Background image with blur + dark tint */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Museum conservatory with glass dome and ocean view"
          className="w-full h-full object-cover"
          width={1280}
          height={960}
        />
      </div>

      {/* Top section — title & subtitle in top 25% */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-32 pb-4 flex-[0_0_25%] animate-fade-in">
        <h1
          className="text-5xl font-black tracking-[0.1em] text-[#0A0A0A] uppercase"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 191, 0, 0.6)) drop-shadow(0 0 18px rgba(255, 191, 0, 0.25))",
          }}
        >
          MUSEUM LENS
        </h1>
      </div>

      {/* Spacer — lets the gallery glow through */}
      <div className="flex-1" />

      {/* Bottom section — Card + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-6 pb-16 mb-6 <div className="relative z-10 flex flex-col items-center gap-6 pb-16 mb-6 -mt-[12%] animate-fade-in"> animate-fade-in">
        {/* Promo card — clickable link to Scanner */}
        <div className="w-[90%] max-w-md mx-auto flex justify-center">
          <Link
            to="/scanner"
            className="block rounded-lg transition-transform duration-300 hover:scale-105"
            style={{
              width: "36vw",
              minWidth: 290,
              maxWidth: 520,
              boxShadow: "0 0 40px 8px rgba(201, 150, 59, 0.5), 0 0 80px 16px rgba(201, 150, 59, 0.25)",
            }}
          >
            <div className="relative w-full">
              <img
                src={cardImage}
                alt="Mother and daughter enjoying art in a gallery"
                className="w-full h-auto rounded object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 rounded-b">
                <p className="text-white text-xs sm:text-sm font-medium leading-snug drop-shadow-md">
                  Want more time to enjoy art?
                  <br />
                  Save it for later!
                </p>
              </div>
              <span className="absolute top-3 right-3 px-6 py-3 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_12px_rgba(255,191,0,0.6),0_0_25px_rgba(255,191,0,0.3)] text-[#FFBF00] text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:bg-white/[0.08]">
                SCAN NOW
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
