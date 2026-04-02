const About = () => {
  return (
    <div className="min-h-[100dvh] bg-background px-6 pt-14 pb-14 relative overflow-hidden">
      {/* Ambient amber mesh glow */}
      <div className="absolute bottom-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full bg-[hsla(var(--gold),0.07)] blur-[120px] pointer-events-none" />

      <div className="max-w-lg mx-auto space-y-12 animate-fade-in relative z-10">
        {/* Brand Header */}
        <div className="text-center pt-2">
          <h1
            className="text-4xl font-extralight tracking-[0.5em] uppercase text-white"
            style={{ textShadow: "0 0 25px rgba(255,191,0,0.4)" }}
          >
            Museum Lens
          </h1>
        </div>

        {/* Mission */}
        <section className="space-y-5 mt-12 pb-10 border-b border-white/10">
          <h2 className="text-2xl font-light tracking-widest uppercase text-white">
            Our Mission
          </h2>
          <div className="space-y-4 text-white/75 leading-loose">
            <p>
              Museum Lens is designed for <span className="text-white/90 font-medium">ease and clarity</span>. Art
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
        <section className="space-y-5">
          <h2 className="text-2xl font-light tracking-widest uppercase text-white">
            How to Use
          </h2>
          <p className="text-white/75 leading-loose">
            Scan the icon next to an artwork to instantly view its details. Browse the gallery to explore more pieces at
            your own pace.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
