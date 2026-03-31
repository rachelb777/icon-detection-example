import { Bookmark } from "lucide-react";
import daliAtomicus from "@/assets/dali-atomicus.jpg";
import riveraMural from "@/assets/rivera-mural.jpg";
import klimtDeathLife from "@/assets/klimt-death-life.jpg";

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
  {
    src: riveraMural,
    title: "Man, Controller of the Universe",
    artist: "Diego Rivera",
    year: "1934",
    description:
      "After his original mural was destroyed at Rockefeller Center, Diego Rivera recreated it in Mexico City. The new version expands on his vision of humanity at the center of a rapidly changing world, surrounded by technology, social conflict, and scientific discovery. The original was removed because it included a portrait of Vladimir Lenin, which Rivera refused to erase. In this version, he doubled down—adding even more political figures, such as Leon Trotsky, and added a scene mocking John D. Rockefeller Jr. who ordered the destruction of his original mural, turning it into a powerful statement about power, progress, and control.",
    attribution: {
      label: "Palacio de Bellas Artes — Public Domain",
      url: "https://commons.wikimedia.org/wiki/File:Man_Controller_of_the_Universe.jpg",
    },
  },
  {
    src: klimtDeathLife,
    title: "Death and Life",
    artist: "Gustav Klimt",
    year: "1910–1915",
    description:
      "The painting contrasts Death and Life. On the left, a dark-robed skeletal figure gazes at the living. On the right, groups of humans—from babies to the elderly—interact in colorful, ornamental surroundings, representing all stages of life. Klimt originally used a gold background, later changing it to gray to highlight this contrast. The work combines his decorative, mosaic-like style with a quiet tension between mortality and vitality.",
    attribution: {
      label: "Wikimedia Commons — Public Domain",
      url: "https://commons.wikimedia.org/wiki/File:Gustav_Klimt_-_Death_and_Life_(First_Version)_-_1910-11.jpg",
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
        <h1 className="font-sans text-2xl font-semibold text-gold-gradient">Museum Gallery</h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Explore each artwork you’ve scanned. See images, read descriptions, and learn about the artists—all in one
          simple, easy-to-use gallery.
        </p>
      </div>

      {/* Artwork list */}
      <div className="w-full max-w-md space-y-6">
        {artworks.map((item, i) => (
          <div key={i} className="rounded-2xl border border-primary/40 shadow-sm bg-card overflow-hidden">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
