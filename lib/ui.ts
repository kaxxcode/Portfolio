// Shared bits used by more than one page.

export const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Shared look for every StarBorder button: light surface; a thin Heddle-blue line circles the edge on hover only (no glow).
export const star = {
  theme: "light" as const,
  color: "#1478E8",
  radius: 12,
  duration: 5,
  trailLength: 0.35,
  glow: 0,
  hover: "reveal" as const, // nothing at rest, the line only appears while hovering
  clickPulse: false,
};
