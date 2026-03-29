import { useSearchParams } from "react-router-dom";
import { Bookmark, Image, Palette, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const sections = [
  { value: "gallery", label: "Gallery", icon: Image },
  { value: "artist", label: "Artist Portfolio", icon: Palette },
  { value: "genre", label: "Genre Discovery", icon: Sparkles },
] as const;

const placeholderImages: Record<string, { src: string; caption: string }[]> = {
  gallery: [
    { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=300&fit=crop", caption: "Starry Night Study" },
    { src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop", caption: "Abstract Form III" },
    { src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&h=300&fit=crop", caption: "Renaissance Portrait" },
    { src: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=300&fit=crop", caption: "Impressionist Garden" },
  ],
  artist: [
    { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=300&fit=crop", caption: "Dalí — Persistence" },
    { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", caption: "Monet — Water Lilies" },
    { src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=300&h=300&fit=crop", caption: "Picasso — Cubist Era" },
  ],
  genre: [
    { src: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=300&h=300&fit=crop", caption: "Surrealism" },
    { src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=300&h=300&fit=crop", caption: "Baroque" },
    { src: "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=300&h=300&fit=crop", caption: "Impressionism" },
    { src: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=300&h=300&fit=crop", caption: "Modern Abstract" },
  ],
};

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("section") || "gallery";

  const handleTab = (value: string) => {
    setSearchParams({ section: value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-8 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Bookmark size={28} className="text-primary" />
        </div>
        <h1 className="font-sans text-2xl font-semibold text-gold-gradient">My Vault</h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Your personal archive of saved art, artists, and genres.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={current} onValueChange={handleTab} className="w-full max-w-md">
        <TabsList className="w-full grid grid-cols-3 bg-secondary/60 backdrop-blur-sm rounded-xl p-1 h-auto gap-1">
          {sections.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg text-xs font-medium
                data-[state=active]:bg-primary/15 data-[state=active]:text-primary
                data-[state=active]:shadow-none transition-colors"
            >
              <Icon size={18} />
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map(({ value, label }) => (
          <TabsContent key={value} value={value} className="mt-5">
            <div className="glass-surface rounded-2xl p-5 min-h-[320px] flex flex-col">
              <h2 className="text-lg font-semibold text-foreground mb-4">{label}</h2>
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  {placeholderImages[value].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="rounded-xl overflow-hidden border border-primary/30 aspect-square">
                        <img
                          src={item.src}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground text-center truncate px-1">
                        {item.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Collection;
