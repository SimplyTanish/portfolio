type Star = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  dur: number;
  delay: number;
};

type Meteor = {
  left: number;
  top: number;
  delay: number;
  dur: number;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS: Star[] = (() => {
  const rand = mulberry32(1337);
  return Array.from({ length: 110 }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 1 + rand() * 1.6,
    opacity: 0.2 + rand() * 0.7,
    dur: 3.5 + rand() * 6,
    delay: rand() * 8,
  }));
})();

const METEORS: Meteor[] = [
  { left: 18, top: 16, delay: 2, dur: 15 },
  { left: 58, top: 10, delay: 9, dur: 17 },
];

export function StarryNight() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-ink"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {METEORS.map((m, i) => (
        <span
          key={`m${i}`}
          className="absolute"
          style={{ left: `${m.left}%`, top: `${m.top}%`, transform: "rotate(-24deg)" }}
        >
          <span
            className="block h-px animate-shoot bg-gradient-to-r from-transparent via-ink/80 to-ink"
            style={{
              width: 130,
              animationDuration: `${m.dur}s`,
              animationDelay: `${m.delay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}