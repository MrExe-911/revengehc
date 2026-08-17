export function SectionHeading({ kicker, title, subtitle, align = "center" }) {
  return (
    <div className={`max-w-2xl mb-8 sm:mb-10 ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <span className="pixel text-primary text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-2.5 sm:mb-3 block">{kicker}</span>
      )}
      <h2 className="pixel text-2xl sm:text-4xl lg:text-5xl font-bold text-white text-glow">{title}</h2>
      {subtitle && <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export default function Section({ id, kicker, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`py-12 sm:py-20 lg:py-28 section-pad ${className}`}>
      {(kicker || title) && <SectionHeading kicker={kicker} title={title} subtitle={subtitle} />}
      {children}
    </section>
  );
}