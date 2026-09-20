import { motion } from "framer-motion";

export function Moon() {
  return (
    <div
      aria-hidden
      className="relative flex h-40 w-40 items-center justify-center sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-[300px] lg:w-[300px]"
    >
      <div
        className="absolute inset-[-10%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 62% 40%, rgba(250,250,250,0.10), rgba(250,250,250,0.03) 45%, transparent 68%)",
        }}
      />
      <svg
        viewBox="0 0 300 300"
        className="pointer-events-none relative size-full drop-shadow-[0_0_42px_rgba(250,250,250,0.12)]"
      >
        <defs>
          <radialGradient id="moon-lit" cx="58%" cy="38%" r="75%">
            <stop offset="0%" stopColor="#f5f5f6" />
            <stop offset="38%" stopColor="#c9c9cf" />
            <stop offset="72%" stopColor="#8f8f98" />
            <stop offset="100%" stopColor="#5a5a62" />
          </radialGradient>
          <radialGradient id="moon-earthshine" cx="70%" cy="45%" r="80%">
            <stop offset="0%" stopColor="#17171b" />
            <stop offset="55%" stopColor="#101013" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </radialGradient>
          <linearGradient id="moon-term" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#050505" />
            <stop offset="100%" stopColor="#1a1a1e" />
          </linearGradient>
          <radialGradient id="crater" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#2a2a30" />
            <stop offset="100%" stopColor="#0c0c0f" />
          </radialGradient>
          <clipPath id="moon-crescent">
            <path d="M 150 16 A 134 134 0 1 1 150 284 A 90 90 0 1 1 150 16 Z" />
          </clipPath>
          <clipPath id="moon-disk">
            <circle cx="150" cy="150" r="134" />
          </clipPath>
          <filter id="moon-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <g transform="rotate(-24 150 150)">
          {/* full disk — earthshine */}
          <circle cx="150" cy="150" r="134" fill="url(#moon-earthshine)" />

          {/* faint craters on the dark side */}
          <g clipPath="url(#moon-disk)">
            <circle cx="78" cy="104" r="15" fill="url(#crater)" opacity="0.5" />
            <circle cx="96" cy="188" r="22" fill="url(#crater)" opacity="0.45" />
            <circle cx="70" cy="158" r="10" fill="url(#crater)" opacity="0.4" />
            <circle cx="120" cy="68" r="9" fill="url(#crater)" opacity="0.35" />
            <circle cx="60" cy="230" r="12" fill="url(#crater)" opacity="0.4" />
          </g>

          {/* terminator — inner edge softness */}
          <path
            d="M 150 16 A 90 90 0 1 1 150 284 A 98 98 0 1 0 150 16 Z"
            fill="url(#moon-term)"
            opacity="0.55"
          />

          {/* lit crescent */}
          <path
            d="M 150 16 A 134 134 0 1 1 150 284 A 90 90 0 1 1 150 16 Z"
            fill="url(#moon-lit)"
          />

          {/* craters on the lit surface */}
          <g clipPath="url(#moon-crescent)">
            <circle cx="212" cy="120" r="13" fill="url(#crater)" opacity="0.6" />
            <circle cx="228" cy="170" r="20" fill="url(#crater)" opacity="0.55" />
            <circle cx="196" cy="218" r="11" fill="url(#crater)" opacity="0.5" />
            <circle cx="206" cy="70" r="8" fill="url(#crater)" opacity="0.45" />
            <circle cx="248" cy="140" r="7" fill="url(#crater)" opacity="0.5" />
            <circle cx="184" cy="150" r="5" fill="url(#crater)" opacity="0.4" />
            <circle cx="216" cy="248" r="6" fill="url(#crater)" opacity="0.4" />

            {/* limb highlight — upper lit edge */}
            <path
              d="M 150 16 A 134 134 0 1 1 262 150"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.28"
              strokeWidth="2.5"
            />
          </g>

          {/* bloom — blurred crescent over the limb */}
          <g filter="url(#moon-bloom)" opacity="0.4">
            <path
              d="M 150 16 A 134 134 0 1 1 150 284 A 90 90 0 1 1 150 16 Z"
              fill="#e8e8ea"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function MoonFloat({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}