import { useSearchParams } from "react-router-dom";
import { Bookmark, Image, Palette, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const sections = [
  { value: "gallery", label: "Gallery", icon: Image },
  { value: "artist", label: "Artist Portfolio", icon: Palette },
  { value: "genre", label: "Genre Discovery", icon: Sparkles },
] as const;

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
          <p className="text-sm text-muted-foreground leading-relaxed">
            <p className="text-sm text-muted-foreground leading-relaxed">
              The <strong>Vault</strong> is your personal archive, accessed by the <strong>"V"</strong> hand sign. Visit
              your saved art in <strong>Gallery</strong>, explore the <strong>Artist Portfolio</strong> to see more of
              your artists' works, or discover similar styles in <strong>Genre Discovery</strong>.
            </p>
          </p>
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

        {sections.map(({ value, label, icon: Icon }) => (
          <TabsContent key={value} value={value} className="mt-5">
            <div className="glass-surface rounded-2xl p-8 min-h-[320px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon size={24} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{label}</h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                {value === "gallery" &&
                  "Your saved artworks will appear here. Scan and save pieces to build your personal gallery."}
                {value === "artist" &&
                  "Explore more works by artists you've saved. Your favorite creators will be collected here."}
                {value === "genre" &&
                  "Discover styles and movements related to your saved art. New genres await your curiosity."}
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Collection;
