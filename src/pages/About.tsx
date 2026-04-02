const About = () => {
  return (
    <div className="min-h-[100dvh] bg-background px-6 pt-14 pb-14 relative overflow-hidden">
      {/* Ambient amber mesh glows */}
      <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] rounded-full bg-[hsla(var(--gold),0.08)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-40px] w-[250px] h-[250px] rounded-full bg-[hsla(var(--gold),0.06)] blur-[120px] pointer-events-none" />

      <div className="max-w-lg mx-auto space-y-12 animate-fade-in relative z-10">
        {/* Mission */}
        <section className="space-y-5">
          <h1 className="text-sm font-light tracking-widest uppercase text-gold-gradient">
            Our Mission
          </h1>
          <div className="w-8 h-px bg-[hsl(var(--gold))] opacity-30" />
          <div className="space-y-4 text-foreground/70 leading-[1.85]">
            <p>
              Museum Lens is designed for <span className="text-foreground/90 font-medium">ease and clarity</span>. Art
              should be experienced—not decoded.
            </p>
            <p>
              Instead of long labels and dense text, Museum Lens uses simple visual icons to guide you. Just scan an
              icon next to an artwork to explore its story in a clear, focused way.
            </p>
            <p>
              Whether you feel overwhelmed by too much information or just want a more immersive experience, Museum Lens
              helps you connect with art—without distraction.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-foreground/[0.06]" />

        {/* How to Use */}
        <section className="space-y-5">
          <h2 className="text-sm font-light tracking-widest uppercase text-gold-gradient">
            How to Use
          </h2>
          <div className="w-8 h-px bg-[hsl(var(--gold))] opacity-30" />
          <p className="text-foreground/70 leading-[1.85]">
            Scan the icon next to an artwork to instantly view its details. Browse the gallery to explore more pieces at
            your own pace.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
