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

        {/* Mission Pillars */}
        <section className="mt-12 space-y-8 pb-10 border-b border-white/10">
          <h2 className="text-2xl font-light tracking-widest uppercase text-white">
            Our Mission
          </h2>

          <div className="space-y-7">
            <p className="text-white/75 leading-loose">
              <span className="text-[hsl(var(--gold))] font-medium">Experience First.</span>{" "}
              No dense labels. No long reading. Just you and the art.
            </p>
            <p className="text-white/75 leading-loose">
              <span className="text-[hsl(var(--gold))] font-medium">Scan to Explore.</span>{" "}
              Look for the Museum Lens icon on the plaque next to the artwork.
            </p>
            <p className="text-white/75 leading-loose">
              <span className="text-[hsl(var(--gold))] font-medium">Clarity at a Tap.</span>{" "}
              Scan the icon to unlock the story in a simple, focused way.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section className="space-y-5">
          <h2 className="text-2xl font-light tracking-widest uppercase text-white">
            How to Use
          </h2>
          <p className="text-white/75 leading-loose">
            Find a Museum Lens icon, point your camera, and let the art speak for itself.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
