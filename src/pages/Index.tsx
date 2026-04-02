import { Link } from "react-router-dom";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-museum.jpg";
import cardImage from "@/assets/card2_mom_girl_art.jpg";

const Index = () => {
  return (
    <div className="h-[100dvh] flex flex-col relative overflow-hidden">
      {/* Background image with blur + dark tint */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Museum gallery with dramatic golden lighting"
          className="w-full h-full object-cover blur-[2px]"
          width={1280}
          height={960}
        />
        <div className="absolute inset-0 bg-[hsla(220,10%,5%,0.45)]" />
      </div>

      {/* Top section — title & subtitle in top 25% */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-14 pb-4 flex-[0_0_25%] animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-md">
          <span className="text-gold-gradient">Museum</span> <span className="text-white drop-shadow-sm">Lens</span>
        </h1>
        <p className="text-white/80 max-w-xs mx-auto leading-relaxed text-center mt-3 drop-shadow-sm">
          Scan icons to unlock deeper meaning in museum art.
        </p>
      </div>

      {/* Spacer — lets the gallery glow through */}
      <div className="flex-1" />

      {/* Bottom section — Card + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-6 pb-24 animate-fade-in">
        {/* Promo card — left-aligned */}
        <div className="w-full px-6 flex justify-start">
          <div className="rounded-lg bg-[hsla(220,10%,10%,0.85)] p-2 shadow-lg" style={{ width: '25vw', minWidth: 200, maxWidth: 360 }}>
            <div className="relative w-full">
              <img
                src={cardImage}
                alt="Mother and daughter enjoying art in a gallery"
                className="w-full h-auto rounded object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b">
                <p className="text-white text-xs sm:text-sm font-medium leading-snug drop-shadow-md">
                  Want more time to enjoy art? Save it for later – here's how…
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link to="/scanner">
          <Button size="lg" className="gap-2 px-8 py-6 text-base font-semibold rounded-full glow-gold">
            <ScanLine size={20} />
            Icon Scan
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
