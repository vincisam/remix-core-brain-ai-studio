const fs = require('fs');
let content = fs.readFileSync('src/components/CoreBrainLogo.tsx', 'utf-8');

content = content.replace(
  /<svg[\s\S]*?<\/svg>/,
  `<svg
            viewBox="0 0 24 24"
            className={\`\${iconSizeMap[size]} z-10 relative group-hover:scale-110 transition-transform duration-500\`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Ring with rotation */}
            <circle cx="12" cy="12" r="9" stroke="url(#coreBrainLogoGradient)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite] origin-center opacity-70" />
            
            {/* Geometric Inner Core */}
            <path
              d="M12 4L18.928 8V16L12 20L5.072 16V8L12 4Z"
              fill="url(#coreBrainLogoGradient)"
              fillOpacity="0.2"
              stroke="url(#coreBrainLogoGradient)"
              strokeWidth="1.5"
            />
            
            {/* Center Eye / Processor Node */}
            <circle cx="12" cy="12" r="3.5" fill="#0b0f19" stroke="#60a5fa" strokeWidth="1.5" className="animate-pulse" />
            <circle cx="12" cy="12" r="1.5" fill="#38bdf8" />

            <defs>
              <linearGradient id="coreBrainLogoGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="0.33" stopColor="#60a5fa" />
                <stop offset="0.66" stopColor="#a855f7" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>`
);

fs.writeFileSync('src/components/CoreBrainLogo.tsx', content);
