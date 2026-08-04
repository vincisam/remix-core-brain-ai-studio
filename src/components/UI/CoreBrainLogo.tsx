import React from "react";

interface CoreBrainLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showSubtitle?: boolean;
}

export const CoreBrainLogo: React.FC<CoreBrainLogoProps> = ({
  size = "md",
  showText = true,
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizeMap = {
    sm: "w-3.5 h-3.5",
    md: "w-4.5 h-4.5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center space-x-2.5 select-none">
      {/* Visual Glowing Core Logo Badge */}
      <div
        className={`${sizeMap[size]} rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-blue-500/20 relative group`}
      >
        <div className="w-full h-full bg-[#090d16] rounded-[10.5px] flex items-center justify-center relative overflow-hidden">
          {/* Background Radial Glow */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-sm group-hover:bg-blue-500/20 transition-all" />
          
          {/* Animated SVG Core Icon */}
          <svg
            viewBox="0 0 24 24"
            className={`${iconSizeMap[size]} z-10 relative group-hover:scale-110 transition-transform duration-500`}
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
          </svg>
        </div>
      </div>

      {showText && (
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center space-x-1.5 font-mono">
            <span className="font-extrabold tracking-tight text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300">
              CORE_BRAIN
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[10px] text-slate-400 font-mono flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>11 Global AI Engines Unified</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
