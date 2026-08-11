export function ScriptureNavigationDiagram() {
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full max-w-[320px] h-auto opacity-80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified flowing path */}
      <path
        d="M40,60 Q80,100 120,90 T200,100 T280,120"
        stroke="#C8A248"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        strokeDasharray="3 3"
      />

      {/* Book cards - simple and clean */}
      {/* Torah */}
      <g>
        <rect x="20" y="40" width="70" height="50" rx="4" fill="#C8A248" opacity="0.15" />
        <rect x="20" y="40" width="70" height="50" rx="4" stroke="#C8A248" strokeWidth="1.5" fill="none" />
        <text x="55" y="70" textAnchor="middle" fontSize="13" fontWeight="500" className="fill-shavat-darkest dark:fill-shavat-cream">
          Torah
        </text>
      </g>

      {/* Prophets */}
      <g>
        <rect x="110" y="70" width="80" height="50" rx="4" stroke="#6B7F69" strokeWidth="1" fill="none" opacity="0.6" />
        <text x="150" y="100" textAnchor="middle" fontSize="12" className="fill-shavat-charcoal dark:fill-shavat-silver">
          Prophets
        </text>
      </g>

      {/* Gospels */}
      <g>
        <rect x="210" y="90" width="80" height="50" rx="4" stroke="#6B7F69" strokeWidth="1" fill="none" opacity="0.6" />
        <text x="250" y="120" textAnchor="middle" fontSize="12" className="fill-shavat-charcoal dark:fill-shavat-silver">
          Gospels
        </text>
      </g>

      {/* Writings */}
      <g>
        <rect x="60" y="150" width="75" height="50" rx="4" stroke="#6B7F69" strokeWidth="1" fill="none" opacity="0.6" />
        <text x="97" y="180" textAnchor="middle" fontSize="12" className="fill-shavat-charcoal dark:fill-shavat-silver">
          Writings
        </text>
      </g>

      {/* Epistles */}
      <g>
        <rect x="155" y="170" width="75" height="50" rx="4" stroke="#6B7F69" strokeWidth="1" fill="none" opacity="0.6" />
        <text x="192" y="200" textAnchor="middle" fontSize="12" className="fill-shavat-charcoal dark:fill-shavat-silver">
          Epistles
        </text>
      </g>

      {/* Current position marker */}
      <circle cx="55" cy="65" r="6" fill="#C8A248" />
      <circle cx="55" cy="65" r="3" fill="#F7F5F1" />
    </svg>
  );
}
