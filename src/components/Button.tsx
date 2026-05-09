import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all duration-200",
  secondary:
    "bg-secondary text-white hover:bg-secondary-hover active:scale-95 transition-all duration-200",
  outline:
    "border-2 border-primary text-primary hover:bg-primary-light active:scale-95 transition-all duration-200",
  ghost:
    "text-primary hover:bg-primary-light active:scale-95 transition-all duration-200",
};

const sizeStyles = {
  sm: "px-3 py-2 text-sm font-medium rounded-md",
  md: "px-4 py-2.5 text-base font-medium rounded-lg",
  lg: "px-6 py-3 text-lg font-medium rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          disabled:opacity-50 disabled:cursor-not-allowed
          font-sans font-medium
          shadow-sm hover:shadow-md
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2v20m10-10H2"
              />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
