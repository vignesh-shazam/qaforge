export default function HeroBackground(): React.JSX.Element {
  return (
    <div className="hero-background" aria-hidden="true">
      {/* Generated background image */}
      <div className="hero-background__image" />

      {/* Dark overlay for readable text */}
      <div className="hero-background__overlay" />

      {/* Animated ambient light */}
      <div className="hero-background__glow hero-background__glow--blue" />
      <div className="hero-background__glow hero-background__glow--purple" />

      {/* Animated particles */}
      <div className="hero-background__particles">
        {Array.from({ length: 24 }, (_, index) => (
          <span
            key={index}
            className="hero-background__particle"
            style={
              {
                "--particle-index": index,
                "--particle-x": `${(index * 37 + 11) % 100}%`,
                "--particle-delay": `${(index % 8) * -0.7}s`,
                "--particle-duration": `${7 + (index % 6)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}