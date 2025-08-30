import React from 'react';

const Logo: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient
        id="gradient1"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient
        id="gradient2"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    <rect
      x="8"
      y="8"
      width="24"
      height="24"
      rx="3"
      fill="url(#gradient1)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1"
    />
    <path
      d="M12 16h16 M12 20h16 M12 24h16 M16 12v16 M20 12v16 M24 12v16"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="0.5"
    />
    <circle cx="20" cy="18" r="2" fill="url(#gradient2)" />
    <path
      d="M20 20v6"
      stroke="url(#gradient2)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="28"
      cy="12"
      r="3"
      fill="rgba(255,255,255,0.1)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="0.5"
    />
    <path
      d="M28 9v6M25 12h6"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M12 28c2-2 4-1 8-1s6-1 8 1"
      stroke="url(#gradient2)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default Logo;