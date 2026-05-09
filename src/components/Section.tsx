import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "secondary" | "accent";
  paddingY?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-white",
  secondary: "bg-surface",
  accent: "bg-primary-light",
};

const paddingYStyles = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16",
  lg: "py-16 sm:py-24",
  xl: "py-20 sm:py-32",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      variant = "default",
      paddingY = "lg",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${paddingYStyles[paddingY]}
          ${className}
        `}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";
