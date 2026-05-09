/**
 * Global Design Tokens
 * Centralized design system values
 */

export const COLORS = {
  // Primary
  primary: "#2E4BFF",
  primaryHover: "#1E3AD8",
  primaryLight: "#EBF0FF",

  // Secondary
  secondary: "#0F172A",
  secondaryHover: "#0A0F1A",

  // Surface & Background
  surface: "#F8FAFF",
  surfaceSecondary: "#F1F5FB",

  // Accent
  accent: "#4B6BFF",
  accentLight: "#F0F4FF",

  // Semantic
  success: "#10B981",
  successLight: "#ECFDF5",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  error: "#EF4444",
  errorLight: "#FEF2F2",

  // Neutrals
  neutral: "#64748B",
  neutralDark: "#334155",
  neutralLight: "#E2E8F0",
  neutralLighter: "#F1F5F9",

  // Text
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textTertiary: "#64748B",

  // Border
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
};

export const TYPOGRAPHY = {
  fontFamily: {
    sans: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
    heading: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
    mono: "'Fira Code', ui-monospace, monospace",
  },
  fontSize: {
    xs: { size: "0.75rem", lineHeight: "1rem" },
    sm: { size: "0.875rem", lineHeight: "1.25rem" },
    base: { size: "1rem", lineHeight: "1.5rem" },
    lg: { size: "1.125rem", lineHeight: "1.75rem" },
    xl: { size: "1.25rem", lineHeight: "1.75rem" },
    "2xl": { size: "1.5rem", lineHeight: "2rem" },
    "3xl": { size: "1.875rem", lineHeight: "2.25rem" },
    "4xl": { size: "2.25rem", lineHeight: "2.5rem" },
    "5xl": { size: "3rem", lineHeight: "3.5rem" },
    "6xl": { size: "3.75rem", lineHeight: "1" },
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "5rem",
  "6xl": "6rem",
  "8xl": "8rem",
};

export const BORDER_RADIUS = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  "3xl": "1.5rem",
  full: "9999px",
};

export const SHADOWS = {
  none: "none",
  xs: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
  sm: "0 1px 3px 0 rgba(15, 23, 42, 0.1)",
  md: "0 4px 6px -1px rgba(15, 23, 42, 0.1)",
  lg: "0 10px 15px -3px rgba(15, 23, 42, 0.1)",
  xl: "0 20px 25px -5px rgba(15, 23, 42, 0.1)",
  soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
  elevated: "0 20px 40px rgba(15, 23, 42, 0.12)",
};

export const TRANSITIONS = {
  duration: {
    fast: "200ms",
    normal: "300ms",
    slow: "500ms",
  },
  timing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Z-index scale for layering
 */
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  tooltip: 1070,
};
