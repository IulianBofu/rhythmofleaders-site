import React from 'react';

export default function Logo({ className = '', light = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Logo Mark */}
      <div className="relative">
        <svg 
          viewBox="0 0 48 48" 
          className="w-10 h-10"
          fill="none"
        >
          {/* Outer ring - pulse effect */}
          <circle 
            cx="24" 
            cy="24" 
            r="22" 
            stroke={light ? 'rgba(255,255,255,0.2)' : 'rgba(13,148,136,0.2)'} 
            strokeWidth="1.5"
          />
          
          {/* Main gradient ring */}
          <circle 
            cx="24" 
            cy="24" 
            r="18" 
            stroke="url(#logoGradient)" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="90 30"
            className="origin-center"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
          
          {/* Inner rhythm bars - heartbeat style */}
          <g className="origin-center">
            {/* Bar 1 */}
            <rect x="14" y="20" width="3" height="8" rx="1.5" fill="url(#logoGradient)" />
            {/* Bar 2 - taller */}
            <rect x="19" y="16" width="3" height="16" rx="1.5" fill="url(#logoGradient)" />
            {/* Bar 3 - tallest (center) */}
            <rect x="24" y="12" width="3" height="24" rx="1.5" fill="url(#logoGradient)" />
            {/* Bar 4 - taller */}
            <rect x="29" y="16" width="3" height="16" rx="1.5" fill="url(#logoGradient)" />
            {/* Bar 5 */}
            <rect x="34" y="20" width="3" height="8" rx="1.5" fill="url(#logoGradient)" />
          </g>
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="50%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className={`text-sm font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
          RHYTHM OF
        </span>
        <span className="text-lg font-black tracking-tight bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          LEADERS
        </span>
      </div>
    </div>
  );
}