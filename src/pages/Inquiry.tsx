import daliAtomicus from "@/assets/dali-atomicus.jpg";

const Inquiry = () => (
  <div className="min-h-screen flex flex-col items-center px-4 pt-6 pb-24">
    <div className="w-full max-w-md space-y-5">
      {/* Artwork image */}
      <div className="rounded-xl overflow-hidden border border-border">
        <img
          src={daliAtomicus}
          alt="Dali Atomicus (1948) by Philippe Halsman and Salvador Dalí"
          className="w-full h-auto"
          width={1280}
          height={960}
        />
      </div>

      {/* Caption */}
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="text-foreground font-medium">Title:</span> Dali Atomicus (1948) by Philippe Halsman &amp; Salvador Dalí
        </p>
        <p>
          <span className="text-foreground font-medium">License:</span> PDM 1.0 via Wikimedia Commons
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Summary info */}
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Match Confidence</p>
          <p className="text-foreground text-lg font-semibold text-primary">96%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Subject</p>
          <p className="text-foreground leading-relaxed">
            Surreal collaboration exploring physical suspension and dynamic motion.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Key Fact</p>
          <p className="text-foreground leading-relaxed">
            It took 28 attempts to capture this single, unedited photograph.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Inquiry;
