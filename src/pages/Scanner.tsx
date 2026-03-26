import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const GESTURES = [
  { name: "Inquiry", route: "/inquiry", symbol: "?" },
  { name: "Collection", route: "/collection", symbol: "C" },
  { name: "Directions", route: "/wayfinding", symbol: "☝" },
  { name: "Live Connect", route: "/live", symbol: "V" },
];

const Scanner = () => {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [result, setResult] = useState<(typeof GESTURES)[0] | null>(null);

  const handleCapture = () => {
    setCaptured(true);
    setRecognizing(true);

    // Simulate gesture recognition
    setTimeout(() => {
      const detected = GESTURES[Math.floor(Math.random() * GESTURES.length)];
      setResult(detected);
      setRecognizing(false);

      // Navigate after showing result
      setTimeout(() => {
        navigate(detected.route);
        // Reset state for when user returns
        setCaptured(false);
        setResult(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Viewfinder */}
      <div className="relative flex-1 flex items-center justify-center bg-black m-3 rounded-2xl overflow-hidden">
        {/* Simulated camera feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,10%,3%)] via-[hsl(220,10%,5%)] to-[hsl(220,10%,3%)]" />

        {/* Scanning line */}
        {!captured && (
          <div className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 animate-scan-line" />
        )}

        {/* Crosshair overlay */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 scanner-crosshair animate-pulse-crosshair">
          {/* Animated corner brackets */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-lg animate-bracket-glow" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary rounded-tr-lg animate-bracket-glow" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary rounded-bl-lg animate-bracket-glow" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary rounded-br-lg animate-bracket-glow" />

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60" />
        </div>

        {/* HUD top-left */}
        <div className="absolute top-4 left-4 text-[11px] text-muted-foreground tracking-widest uppercase">
          Gesture Detection
        </div>

        {/* HUD top-right live indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] text-muted-foreground tracking-wide uppercase">Live</span>
        </div>

        {/* Recognition overlay */}
        {captured && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            {recognizing ? (
              <div className="text-center space-y-3 animate-fade-in">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-foreground/80 text-sm">Recognizing gesture…</p>
              </div>
            ) : result ? (
              <div className="text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary flex items-center justify-center mx-auto text-2xl text-primary">
                  {result.symbol}
                </div>
                <p className="text-foreground font-medium">
                  Gesture detected: <span className="text-primary">{result.name}</span>
                </p>
                <p className="text-muted-foreground text-sm">Navigating…</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Bottom instruction */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-foreground/70 text-sm px-4">
          Aim at artwork → make a hand gesture → press Capture
        </div>
      </div>

      {/* Capture button */}
      <div className="px-4 py-3 flex justify-center">
        <Button
          size="lg"
          onClick={handleCapture}
          disabled={captured}
          className="gap-2 px-10 py-6 text-base font-semibold rounded-full glow-gold"
        >
          <Camera size={20} />
          {captured ? "Processing…" : "Capture"}
        </Button>
      </div>
    </div>
  );
};

export default Scanner;
