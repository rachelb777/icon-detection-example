import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import blurryArtwork from "@/assets/blurry-artwork.jpg";

const gestures = [
  {
    label: "Info",
    svg: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <circle cx="20" cy="14" r="6" />
        <path d="M17 14c0-1.7 1.3-3 3-3" />
        <path d="M20 20v4" />
        <circle cx="20" cy="28" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Collection",
    svg: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M28 14c-2-3-5-5-8-5s-6 2-8 5c-2 3-3 6-3 9s1 6 3 9c2 3 5 5 8 5" />
      </svg>
    ),
  },
  {
    label: "Directions",
    svg: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M20 8v24" />
        <path d="M20 8l-4 6h8l-4-6z" fill="currentColor" stroke="none" />
        <circle cx="20" cy="36" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Video",
    svg: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M14 10l6 12 6-12" />
      </svg>
    ),
  },
];

const Scanner = () => {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [matched, setMatched] = useState(false);
  const [pressing, setPressing] = useState(false);

  const handleCapture = () => {
    setCaptured(true);
    setPressing(true);
    setRecognizing(true);

    setTimeout(() => setPressing(false), 300);

    setTimeout(() => {
      setRecognizing(false);
      setMatched(true);

      setTimeout(() => {
        navigate("/inquiry");
        setCaptured(false);
        setMatched(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Viewfinder */}
      <div className="relative flex-1 flex items-center justify-center bg-black m-3 rounded-2xl overflow-hidden">
        {/* Blurry artwork background */}
        <img src={blurryArtwork} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Scanning line */}
        {!captured && (
          <div className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 animate-scan-line" />
        )}

        {/* Crosshair overlay */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 scanner-crosshair animate-pulse-crosshair z-20">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-lg animate-bracket-glow" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary rounded-tr-lg animate-bracket-glow" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary rounded-bl-lg animate-bracket-glow" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary rounded-br-lg animate-bracket-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60" />
        </div>

        {/* HUD top-left */}
        <div className="absolute top-4 left-4 text-[11px] text-muted-foreground tracking-widest uppercase z-20">
          Gesture Detection
        </div>

        {/* HUD top-right live indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] text-muted-foreground tracking-wide uppercase">Live</span>
        </div>

        {/* Gesture Legend */}
        {!captured && (
          <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-6 z-20">
            {gestures.map((g) => (
              <div key={g.label} className="flex flex-col items-center gap-1">
                <div className="text-primary/70">{g.svg}</div>
                <span className="text-[9px] text-muted-foreground tracking-wide uppercase">{g.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recognition overlay */}
        {captured && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30">
            {recognizing ? (
              <div className="text-center space-y-3 animate-fade-in">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-foreground/80 text-sm">Recognizing gesture…</p>
              </div>
            ) : matched ? (
              <div className="text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary flex items-center justify-center mx-auto text-2xl text-primary">
                  ✓
                </div>
                <p className="text-foreground font-medium">
                  Gesture detected: <span className="text-primary">Inquiry</span>
                </p>
                <p className="text-muted-foreground text-sm">Navigating…</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Bottom instruction */}
        <div className="absolute bottom-2 left-0 right-0 pb-4 text-center text-foreground text-sm px-4 z-20 font-medium">
          Aim at artwork → make a hand gesture → press Capture
          <br />
          <span className="text-sm text-white/90 italic mt-1 block">
            Your Info and Audio scans will open in Insights.
          </span>
        </div>
      </div>

      {/* Capture button */}
      <div className="px-4 py-3 flex justify-center">
        <Button
          size="lg"
          onClick={handleCapture}
          disabled={captured}
          className={`gap-2 px-10 py-6 text-base font-semibold rounded-full glow-gold transition-transform duration-150 ${
            pressing ? "scale-90 opacity-80" : ""
          }`}
        >
          <Camera size={20} />
          {captured ? "Processing…" : "Capture"}
        </Button>
      </div>
    </div>
  );
};

export default Scanner;
