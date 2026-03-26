import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

const MissionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center gap-1.5 group transition-all">
          <span className="text-[11px] font-medium tracking-widest uppercase text-primary">
            Our Mission
          </span>
          <div className="p-3 rounded-full glass-surface text-primary group-hover:bg-[hsla(var(--surface-glass),0.12)] transition-colors">
            <Info size={22} />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-gold-gradient">
            Our Mission
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          <p>
            Museum Lens is designed for{" "}
            <span className="text-foreground font-medium">cognitive ease</span>.
            We believe art should be experienced, not deciphered.
          </p>
          <p>
            Our gesture-based system replaces cluttered labels and dense plaques
            with intuitive hand signals — giving you a{" "}
            <span className="text-foreground font-medium">
              simpler, stress-free
            </span>{" "}
            way to explore.
          </p>
          <p>
            Whether you experience visual overload, have ADHD, dyslexia, or
            simply prefer immersive experiences — Museum Lens puts the art
            first.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MissionDialog;
