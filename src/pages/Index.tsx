import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
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
         
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-black/40 blur-md rounded-lg"></div>
       
          <h1
          className="text-5xl font-bold tracking-[0.05em] text-[#0A0A0A] uppercase"
          style={{
            filter: "drop-shadow(0 0 6px rgba(255, 191, 0, 0.5)) drop-shadow(0 0 12px rgba(255, 191, 0, 0.2))",
          }}
        >
          Museum Lens
        </h1>
      </div>

      {/* Spacer — lets the gallery glow through */}
      <div className="flex-1" />

      {/* Bottom section — Card + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-6 pb-16 mb-6 -mt-[8%] animate-fade-in">
        {/* Promo card — clickable link to Scanner */}
        <div className="w-[90%] max-w-md mx-auto flex justify-center">
          <Link
            to="/scanner"
            className="block rounded-lg overflow-hidden bg-black transition-transform duration-300 hover:scale-105"
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
                className="w-full h-auto object-contain"
              />
              <div
                className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-4 pt-16"
                style={{
                  background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-4 h-4 text-white shrink-0" />
                  <span className="font-sans text-white text-sm sm:text-base tracking-wide font-medium">
                    Tap to Scan
                  </span>
                </div>
                <p className="font-sans text-white text-xs sm:text-sm font-light leading-relaxed text-center px-4">
                  Want more time to enjoy art?
                  <br />
                  <span className="font-sans text-[0.9em] italic font-normal">Save it for later!</span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
