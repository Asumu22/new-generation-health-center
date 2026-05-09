/**
 * Design System Utilities
 * Helper functions and utilities for design system components
 */

/**
 * Merge class names conditionally
 */
export const cn = (
  ...classes: (string | undefined | null | boolean)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Combine Tailwind classes safely
 */
export const mergeClasses = (base: string, override: string = ""): string => {
  if (!override) return base;
  return `${base} ${override}`;
};

/**
 * Generate button classes based on variant and size
 */
export interface ButtonClassesProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
}

export const getButtonClasses = ({
  variant = "primary",
  size = "md",
  isDisabled = false,
}: ButtonClassesProps): string => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-secondary text-white hover:bg-secondary-hover",
    outline: "border-2 border-primary text-primary hover:bg-primary-light",
    ghost: "text-primary hover:bg-primary-light",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return cn(
    "font-medium rounded-lg transition-all duration-200",
    variants[variant],
    sizes[size],
    isDisabled && "opacity-50 cursor-not-allowed",
  );
};

/**
 * Get responsive padding classes
 */
export const getResponsivePadding = (
  mobile: string,
  tablet: string = "",
  desktop: string = "",
): string => {
  const classes = [mobile];
  if (tablet) classes.push(`sm:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  return classes.join(" ");
};

/**
 * Get responsive grid classes
 */
export const getResponsiveGrid = (
  mobile: number = 1,
  tablet: number = 2,
  desktop: number = 3,
): string => {
  const baseGrid = `grid-cols-${mobile}`;
  const tabletGrid = `sm:grid-cols-${tablet}`;
  const desktopGrid = `lg:grid-cols-${desktop}`;
  return `grid ${baseGrid} ${tabletGrid} ${desktopGrid} gap-4 sm:gap-6 lg:gap-8`;
};

/**
 * Convert design tokens to CSS variable syntax
 */
export const tokenToCssVar = (tokenName: string): string => {
  return `var(--${tokenName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "")})`;
};

/**
 * Create focus ring classes for accessibility
 */
export const focusRingClasses = (): string => {
  return "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white";
};

/**
 * Create disabled state classes
 */
export const disabledClasses = (isDisabled: boolean = true): string => {
  if (!isDisabled) return "";
  return "opacity-50 cursor-not-allowed pointer-events-none";
};

/**
 * Create hover state with smooth transition
 */
export const hoverClasses = (hoverClass: string = "shadow-lg"): string => {
  return `transition-all duration-200 hover:${hoverClass}`;
};

/**
 * Create responsive font size classes
 */
export const getResponsiveFontSize = (
  mobile: "sm" | "base" | "lg" | "xl" | "2xl" = "base",
  tablet: "sm" | "base" | "lg" | "xl" | "2xl" = "base",
  desktop: "sm" | "base" | "lg" | "xl" | "2xl" = "lg",
): string => {
  return `text-${mobile} sm:text-${tablet} lg:text-${desktop}`;
};

/**
 * Truncate text utilities
 */
export const truncateClasses = (lines: number = 1): string => {
  if (lines === 1) return "truncate";
  return `line-clamp-${lines}`;
};

/**
 * Accessibility helpers
 */
export const a11yClasses = {
  srOnly: "sr-only",
  focusVisible:
    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  ariaLabel: (label: string) => `aria-label="${label}"`,
};
