import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bookmark, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import daliAtomicus from "@/assets/dali-atomicus.jpg";
import riveraMural from "@/assets/rivera-mural.jpg";
import klimtDeathLife from "@/assets/klimt-death-life.jpg";
import hokusaiWave from "@/assets/hokusai-wave.jpg";

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

function removeId(id: string) {
  const ids = getSavedIds().filter((i) => i !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
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

  const handleRemove = (id: string) => {
    removeId(id);
    setSavedIds(getSavedIds());
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center px-4 pt-14 pb-24 space-y-6 relative overflow-hidden">
      {/* Ambient amber mesh glow */}
      <div className="absolute bottom-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full bg-[hsla(var(--gold),0.07)] blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 relative z-10">
        <h1
          className="text-4xl font-extralight tracking-[0.5em] uppercase text-white"
          style={{ textShadow: "0 0 25px rgba(255,191,0,0.4)" }}
        >
          Gallery
        </h1>
        <p className="text-sm font-light tracking-wide text-white/60 max-w-md mx-auto mt-4">
          {visibleArtworks.length === 0
            ? "No artworks yet — start scanning icons to fill your gallery!"
            : "Here are the artworks you've saved. Keep discovering more!"}
        </p>

        {/* Icon Scan button */}
        <div className="w-full flex justify-center mt-4">
          <Link to="/scanner">
            <button className="inline-flex items-center px-12 py-6 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_22px_rgba(255,191,0,0.6),0_0_45px_rgba(255,191,0,0.3)] text-[hsl(var(--gold))] text-xs font-medium tracking-[0.3em] uppercase hover:bg-white/[0.08] transition-all duration-500">
              Icon Scan
            </button>
          </Link>
        </div>
      </div>

      {/* Artwork list */}
      {visibleArtworks.length > 0 && (
        <div
          className={`w-full max-w-4xl grid gap-6 relative z-10 ${
            visibleArtworks.length === 1 ? "justify-items-center" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
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
                className={`rounded-2xl overflow-hidden transition-all duration-500 ease-out bg-white/5 backdrop-blur-md border ${
                  isHighlighted
                    ? "border-[hsl(var(--gold))]/50 ring-2 ring-[hsl(var(--gold))]/30 scale-[1.02]"
                    : "border-white/10"
                }`}
              >
                <img src={item.src} alt={item.title} className="w-full h-auto" loading="lazy" />
                <div className="p-5 space-y-2">
                  <h2 className="text-lg font-light tracking-wide text-white">{item.title}</h2>
                  <p className="text-sm text-white/50 italic">
                    {item.artist}, {item.year}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                  {item.attribution && (
                    <a
                      href={item.attribution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[11px] text-white/30 underline underline-offset-2 hover:text-white/60 transition-colors mt-1"
                    >
                      {item.attribution.label}
                    </a>
                  )}
                  <div className="pt-2">
                    {saved ? (
                      <span
                        className={`inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--gold))] transition-opacity ${justSaved ? "animate-fade-in" : ""}`}
                      >
                        <Check size={16} /> Saved
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleSave(item.id)}
                        className="gap-1.5 bg-transparent border border-[hsl(var(--gold))]/50 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
                      >
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
