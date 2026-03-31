import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, VideoOff } from "lucide-react";

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/QvKC9WfFf/";

const CLASS_TO_ARTWORK: Record<string, string> = {
  "Class 1": "dali",
  "Class 3": "rivera",
  "Class 4": "klimt",
  "Class 5": "wave",
};

// Dynamically load the TM + TF scripts
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

const Scanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const modelRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);
  const navigatedRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string>("none");
  const [confidence, setConfidence] = useState(0);
  const [matched, setMatched] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Load TensorFlow.js and Teachable Machine
        await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js");

        const tmImage = (window as any).tmImage;
        if (!tmImage) throw new Error("Teachable Machine library failed to load");

        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";
        const model = await tmImage.load(modelURL, metadataURL);
        if (cancelled) return;
        modelRef.current = model;

        // Start camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        });
        if (cancelled) {
          stream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
          return;
        }
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setCameraActive(true);
        setLoading(false);

        // Start prediction loop
        const loop = async () => {
          if (cancelled || navigatedRef.current || !videoRef.current || !modelRef.current) return;
          try {
            const predictions = await modelRef.current.predict(videoRef.current);
            // Find the top prediction
            let topClass = "none";
            let topProb = 0;
            for (const p of predictions) {
              if (p.probability > topProb) {
                topProb = p.probability;
                topClass = p.className;
              }
            }
            if (!cancelled && !navigatedRef.current) {
              setPrediction(topClass);
              setConfidence(Math.round(topProb * 100));

              // If confident enough and it's a known class, navigate
              if (topProb > 0.8 && CLASS_TO_ARTWORK[topClass]) {
                navigatedRef.current = true;
                setMatched(true);
                setTimeout(() => {
                  navigate(`/collection?artwork=${CLASS_TO_ARTWORK[topClass]}`);
                }, 1200);
                return;
              }
            }
          } catch {
            // ignore prediction errors
          }
          animFrameRef.current = requestAnimationFrame(loop);
        };
        animFrameRef.current = requestAnimationFrame(loop);
      } catch (err: any) {
        if (!cancelled) {
          console.error("Scanner init error:", err);
          setError(err?.message || "Failed to initialize camera or model");
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [navigate, stopCamera]);

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Viewfinder */}
      <div className="relative flex-1 flex items-center justify-center bg-black m-3 rounded-2xl overflow-hidden">
        {/* Live camera feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: cameraActive ? "block" : "none" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

        {/* Scanning line */}
        {cameraActive && !matched && (
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

        {/* HUD top-right live indicator */}
        {cameraActive && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] text-white drop-shadow-sm tracking-wide uppercase">Live</span>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
            <div className="text-center space-y-3 animate-fade-in">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-foreground/80 text-sm">Loading model & camera…</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
            <div className="text-center space-y-3 animate-fade-in px-6">
              <VideoOff size={32} className="text-destructive mx-auto" />
              <p className="text-foreground/80 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Match overlay */}
        {matched && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30">
            <div className="text-center space-y-3 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary flex items-center justify-center mx-auto text-2xl text-primary">
                ✓
              </div>
              <p className="text-foreground font-medium">
                <span className="text-primary">Icon recognized! Opening artwork…</span>
              </p>
            </div>
          </div>
        )}

        {/* Prediction HUD bottom-left */}
        {cameraActive && !matched && !loading && (
          <div className="absolute bottom-10 left-4 z-20 glass-surface rounded-lg px-3 py-2 space-y-0.5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Detected</p>
            <p className="text-sm font-semibold text-foreground">
              {prediction === "none" ? "No icon" : prediction}
            </p>
            <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground">{confidence}%</p>
          </div>
        )}

        {/* Bottom instruction */}
        {cameraActive && !matched && (
          <div className="absolute bottom-2 left-0 right-0 text-center text-foreground text-sm px-4 z-20 font-medium">
            Point at an artwork's icon — detection is automatic
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="px-4 py-3 flex justify-center">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Camera size={18} />
          {loading ? "Initializing…" : matched ? "Matched!" : "Scanning in real time"}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
