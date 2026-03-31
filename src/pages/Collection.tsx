import { Bookmark } from "lucide-react";
import daliAtomicus from "@/assets/dali-atomicus.jpg";

interface ArtworkItem {
  src: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  attribution?: { label: string; url: string };
}

const artworks: ArtworkItem[] = [
  {
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
];

const Collection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-8 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Bookmark size={28} className="text-primary" />
        </div>
        <h1 className="font-sans text-2xl font-semibold text-gold-gradient">My Gallery</h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Your personal archive of saved art, artists, and genres.
        </p>
      </div>

      {/* Artwork list */}
      <div className="w-full max-w-md space-y-6">
        {artworks.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-primary/30 bg-card overflow-hidden"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-auto"
              loading="lazy"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-lg font-bold text-foreground">{item.title}</h2>
              <p className="text-sm text-muted-foreground italic">
                {item.artist}, {item.year}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {item.description}
              </p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
