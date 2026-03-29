import { useState, useRef, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import daliAtomicus from "@/assets/dali-atomicus.jpg";

const PLACEHOLDER_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const Inquiry = () => {
  const [mode, setMode] = useState<"story" | "audio">("story");
  const [audioState, setAudioState] = useState<"stopped" | "playing" | "paused">("stopped");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [saved, setSaved] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const audio = new Audio(PLACEHOLDER_AUDIO_URL);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setProgress(audio.currentTime));
    audio.addEventListener("ended", () => {
      setAudioState("stopped");
      setProgress(0);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handlePlay = () => {
    audioRef.current?.play();
    setAudioState("playing");
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setAudioState("paused");
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudioState("stopped");
    setProgress(0);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    if (saved) return;
    e.preventDefault();
    setSaved(true);
    toast({ title: "Saved!", description: "Added to your Vault." });
    setTimeout(() => {
      // navigate via the link's default after toast shows
      const link = e.currentTarget as HTMLAnchorElement;
      link.click();
    }, 800);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-6 pb-32">
      <div className="w-full max-w-md space-y-6">
        {/* Artwork image with gallery float effect */}
        <div className="rounded-xl overflow-hidden shadow-2xl border border-primary/40">
          <img
            src={daliAtomicus}
            alt="Dali Atomicus (1948) by Philippe Halsman and Salvador Dalí"
            className="w-full h-auto"
            width={1280}
            height={960}
          />
        </div>

        {/* Title row with save button */}
        <div className="flex items-center justify-between pt-4 gap-3">
          <div className="space-y-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground font-sans">
              Dali Atomicus
            </h1>
            <p className="text-sm italic text-muted-foreground">
              Philippe Halsman &amp; Salvador Dalí, 1948
            </p>
          </div>
          <button
            onClick={() => {
              if (saved) return;
              setSaved(true);
              toast({ title: "Saved!", description: "Added to your Vault." });
            }}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold
              bg-white/10 backdrop-blur-md border transition-all duration-300
              ${saved
                ? "border-primary text-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                : "border-primary/40 text-white hover:border-primary hover:shadow-[0_0_10px_hsl(var(--primary)/0.4)]"
              }`}
          >
            {saved ? "Saved!" : "Save to Vault"}
          </button>
        </div>

        {/* Match Confidence */}
        <div className="text-center pt-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Match Confidence
          </p>
          <p className="text-xl font-bold text-primary">96%</p>
        </div>

        {/* Pill toggle */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full bg-muted p-1 gap-1">
            <button
              onClick={() => setMode("story")}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mode === "story"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Story
            </button>
            <button
              onClick={() => setMode("audio")}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mode === "audio"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Audio
            </button>
          </div>
        </div>

        {/* Content area */}
        {mode === "story" ? (
          <div className="space-y-5 pt-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">
                Subject
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Surreal collaboration exploring physical suspension and dynamic motion.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">
                Key Fact
              </p>
              <p className="text-foreground/80 leading-relaxed">
                It took 28 attempts to capture this single, unedited photograph.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">
                Audio Narration
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 rounded-full border border-border ${
                    audioState === "playing"
                      ? "text-primary border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={handlePlay}
                  aria-label="Play narration"
                >
                  <Play size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 rounded-full border border-border ${
                    audioState === "paused"
                      ? "text-primary border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={handlePause}
                  aria-label="Pause narration"
                >
                  <Pause size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 rounded-full border border-border ${
                    audioState === "stopped"
                      ? "text-primary border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={handleStop}
                  aria-label="Stop narration"
                >
                  <Square size={16} />
                </Button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <Slider
                value={[progress]}
                max={duration || 100}
                step={0.5}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}


        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Footer: License & attribution */}
        <div className="text-center text-[10px] text-muted-foreground pb-4 space-y-0.5">
          <p>
            License:{" "}
            <a
              href="https://creativecommons.org/publicdomain/mark/1.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              PDM 1.0
            </a>{" "}
            via{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Salvador_Dali_A_(Dali_Atomicus)_09633u.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Wikimedia Commons
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
