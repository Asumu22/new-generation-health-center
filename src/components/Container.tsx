import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

const sizeStyles = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "w-full",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          mx-auto px-4 sm:px-6 lg:px-8
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
