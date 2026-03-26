import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import handGesture from "@/assets/hand-gesture.png";
import blurryArtwork from "@/assets/blurry-artwork.jpg";

const Scanner = () => {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [matched, setMatched] = useState(false);

  const handleCapture = () => {
    setCaptured(true);
    setRecognizing(true);

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
        <img
          src={blurryArtwork}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Scanning line */}
        {!captured && (
          <div className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 animate-scan-line" />
        )}

        {/* Hand gesture overlay */}
        {!captured && (
          <img
            src={handGesture}
            alt="Hand gesture overlay"
            className="absolute z-10 w-32 h-32 sm:w-40 sm:h-40 opacity-30 invert"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            width={512}
            height={512}
          />
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
        <div className="absolute bottom-4 left-0 right-0 text-center text-foreground/70 text-sm px-4 z-20">
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
