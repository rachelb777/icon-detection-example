import { Link } from "react-router-dom";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import MissionDialog from "@/components/MissionDialog";
import heroImage from "@/assets/hero-museum.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-screen hero */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Museum gallery with dramatic golden lighting"
            className="w-full h-full object-cover"
            width={1280}
            height={960}
          />
          <div className="absolute inset-0 bg-[hsla(220,10%,8%,0.65)]" />
        </div>

        {/* Content — centered */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6 space-y-8 animate-fade-in">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="text-gold-gradient">Museum</span>{" "}
              <span className="text-foreground">Lens</span>
            </h1>
            <p className="text-foreground/80 max-w-xs mx-auto leading-relaxed">
              Experience art through gestures. No clutter, no overload — just you and the art.
            </p>
          </div>

          {/* CTA */}
          <Link to="/scanner">
            <Button
              size="lg"
              className="gap-2 px-8 py-6 text-base font-semibold rounded-full glow-gold"
            >
              <ScanLine size={20} />
              Start Scanning
            </Button>
          </Link>

          {/* Mission info */}
          <div className="pt-4">
            <MissionDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
