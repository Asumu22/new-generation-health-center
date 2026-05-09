import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated";
  padding?: "sm" | "md" | "lg";
  rounded?: "md" | "lg" | "xl";
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-white border border-border-light",
  outlined: "bg-white border-2 border-border",
  elevated: "bg-white shadow-lg",
};

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const roundedStyles = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      rounded = "lg",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${roundedStyles[rounded]}
          transition-shadow duration-200
          hover:shadow-md
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
