import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import daliAtomicus from "@/assets/dali-atomicus.jpg";
import riveraMural from "@/assets/rivera-mural.jpg";
import klimtDeathLife from "@/assets/klimt-death-life.jpg";
import hokusaiWave from "@/assets/hokusai-wave.jpg";
import { ScanLine } from "lucide-react";
import { Link } from "react-router-dom"; // make sure Link is imported

interface ArtworkItem {
  id: string;
  src: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  attribution?: { label: string; url: string };
}

const ALL_ARTWORKS: ArtworkItem[] = [
  {
    id: "dali-atomicus",
    src: daliAtomicus,
    title: "Dali Atomicus",
    artist: "Philippe Halsman & Salvador Dalí",
    year: "1948",
    description:
      "A surreal collaboration exploring physical suspension and dynamic motion. It took 28 attempts to capture this single, unedited photograph.",
    attribution: {
      label: "Wikimedia Commons — PDM 1.0",
      url: "https://commons.wikimedia.org/wiki/File:Salvador_Dali_A_(Dali_Atomicus)_09633u.jpg",
    },
  },
  {
    id: "rivera-mural",
    src: riveraMural,
    title: "Man, Controller of the Universe",
    artist: "Diego Rivera",
    year: "1934",
    description:
      "After his original mural was destroyed at Rockefeller Center, Diego Rivera recreated it in Mexico City. The new version expands on his vision of humanity at the center of a rapidly changing world, surrounded by technology, social conflict, and scientific discovery.",
    attribution: {
      label: "Palacio de Bellas Artes — Public Domain",
      url: "https://commons.wikimedia.org/wiki/File:Man_Controller_of_the_Universe.jpg",
    },
  },
  {
    id: "klimt-death-life",
    src: klimtDeathLife,
    title: "Death and Life",
    artist: "Gustav Klimt",
    year: "1910–1915",
    description:
      "The painting contrasts Death and Life. On the left, a dark-robed skeletal figure gazes at the living. On the right, groups of humans—from babies to the elderly—interact in colorful, ornamental surroundings, representing all stages of life.",
    attribution: {
      label: "Wikimedia Commons — Public Domain",
      url: "https://commons.wikimedia.org/wiki/File:Gustav_Klimt_-_Death_and_Life_(First_Version)_-_1910-11.jpg",
    },
  },
  {
    id: "hokusai-wave",
    src: hokusaiWave,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: "c. 1831",
    description:
      "Hokusai's iconic woodblock print shows a massive wave towering over boats near Kanagawa. The wave's curling forms and frothy tips convey both beauty and power, while Mount Fuji appears calmly in the background.",
    attribution: {
      label: "Wikimedia Commons — Public Domain",
      url: "https://commons.wikimedia.org/wiki/File:Great_Wave_off_Kanagawa.jpg",
    },
  },
];

const QUERY_TO_ID: Record<string, string> = {
  dali: "dali-atomicus",
  rivera: "rivera-mural",
  klimt: "klimt-death-life",
  wave: "hokusai-wave",
};

const STORAGE_KEY = "museum-lens-saved-artworks";

function getSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveId(id: string) {
  const ids = getSavedIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

const Collection = () => {
  const [searchParams] = useSearchParams();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const artworkParam = searchParams.get("artwork");
  const detectedId = artworkParam ? QUERY_TO_ID[artworkParam] : undefined;

  const [savedIds, setSavedIds] = useState<string[]>(getSavedIds);
  const [justSavedId, setJustSavedId] = useState<string | null>(null);

  // Build visible artworks: saved ones + the currently detected one
  const visibleArtworks = ALL_ARTWORKS.filter((a) => savedIds.includes(a.id) || a.id === detectedId);

  useEffect(() => {
    if (detectedId && cardRefs.current[detectedId]) {
      setTimeout(() => {
        cardRefs.current[detectedId]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [detectedId]);

  const handleSave = (id: string) => {
    saveId(id);
    setSavedIds(getSavedIds());
    setJustSavedId(id);
    setTimeout(() => setJustSavedId(null), 2000);
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-8 pb-24 space-y-6">
      {/* Header + always-visible Icon Scan button */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Bookmark size={32} className="text-primary" />
        </div>
        <h1 className="font-sans text-3xl font-bold text-gold-gradient">Museum Gallery</h1>
        <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          {visibleArtworks.length === 0
            ? "No artworks yet — start scanning icons to fill your gallery!"
            : "Here are the artworks you've saved. Keep discovering more!"}
        </p>

        {/* Icon Scan button */}
        <div className="w-full flex justify-center mt-4">
          <Link to="/scanner">
            <Button size="lg" className="gap-2 px-8 py-6 text-base font-semibold rounded-full glow-gold">
              <ScanLine size={20} />
              Icon Scan
            </Button>
          </Link>
        </div>
      </div>

      {/* Empty state 
      {visibleArtworks.length === 0 && (
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-3 opacity-50">
            <Bookmark size={48} className="text-muted-foreground mx-auto" />
            <p className="text-muted-foreground text-sm">No artworks yet</p>
          </div>
        </div>
      )}
      */}

      {/* Artwork list */}
      {visibleArtworks.length > 0 && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleArtworks.map((item) => {
            const isHighlighted = detectedId === item.id;
            const saved = isSaved(item.id);
            const justSaved = justSavedId === item.id;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[item.id] = el;
                }}
                className={`rounded-2xl border shadow-sm bg-card overflow-hidden transition-all duration-500 ease-out ${
                  isHighlighted ? "border-primary ring-2 ring-primary/50 scale-[1.02]" : "border-primary/40"
                }`}
              >
                <img src={item.src} alt={item.title} className="w-full h-auto" loading="lazy" />
                <div className="p-5 space-y-2">
                  <h2 className="text-lg font-bold text-foreground">{item.title}</h2>
                  <p className="text-sm text-muted-foreground italic">
                    {item.artist}, {item.year}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
                  {item.attribution && (
                    <a
                      href={item.attribution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors mt-1"
                    >
                      {item.attribution.label}
                    </a>
                  )}
                  <div className="pt-2">
                    {saved ? (
                      <span
                        className={`inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity ${justSaved ? "animate-fade-in" : ""}`}
                      >
                        <Check size={16} /> Saved ✓
                      </span>
                    ) : (
                      <Button size="sm" onClick={() => handleSave(item.id)} className="gap-1.5">
                        <Bookmark size={14} />
                        Save to Gallery
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Collection;
