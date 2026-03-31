const About = () => {
  return (
    <div className="min-h-[100dvh] bg-background px-6 pt-14 pb-14">
      <div className="max-w-lg mx-auto space-y-10 animate-fade-in">
        {/* Mission */}

        <section className="space-y-4 p-6 bg-card rounded-2xl border border-primary/30 shadow-md">
          <h1 className="text-3xl font-bold text-gold-gradient">Our Mission</h1>
          <div className="space-y-3 text-foreground/80 leading-relaxed">
            <p>
              Museum Lens is designed for <span className="text-foreground font-medium">ease and clarity</span>. Art
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

        {/* How to Use */}
        <section className="space-y-4 p-6 pb-6 bg-card rounded-2xl border border-primary/30 shadow-md">
          <h2 className="text-2xl font-semibold text-gold-gradient">How to Use</h2>
          <p className="text-foreground/80 leading-relaxed">
            Scan the icon next to an artwork to instantly view its details. Browse the gallery to explore more pieces at
            your own pace.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
