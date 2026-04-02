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
      <div className="relative z-10 flex flex-col items-center justify-center pt-14 pb-4 flex-[0_0_25%] animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-md">
          <span className="text-gold-gradient">Museum</span> <span className="text-white drop-shadow-sm">Lens</span>
        </h1>
      </div>

      {/* Spacer — lets the gallery glow through */}
      <div className="flex-1" />

      {/* Bottom section — Card + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-6 pb-24 animate-fade-in">
        {/* Promo card — clickable link to Scanner */}
        <div className="w-full px-6 flex justify-center -translate-x-[10%]">
          <Link to="/scanner" className="block rounded-lg transition-transform duration-300 hover:scale-105" style={{ width: "31.25vw", minWidth: 250, maxWidth: 450 }}>
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
                  Save it for later – here's how…
                </p>
              </div>
              <span className="absolute top-3 right-3 bg-[hsl(var(--gold))] text-black text-xs sm:text-sm font-extrabold tracking-widest px-3 py-1 rounded drop-shadow-md">
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
