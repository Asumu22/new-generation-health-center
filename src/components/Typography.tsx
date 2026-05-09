import React from "react";

// Heading Component
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

const headingSizeStyles = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
  xl: "text-4xl sm:text-5xl",
  "2xl": "text-5xl sm:text-6xl",
  "3xl": "text-6xl",
};

const colorStyles = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
};

const weightStyles = {
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = "h1",
      size = "lg",
      weight = "bold",
      color = "primary",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const HeadingComponent = level;
    return (
      <HeadingComponent
        ref={ref}
        className={`
          ${headingSizeStyles[size]}
          ${weightStyles[weight]}
          ${colorStyles[color]}
          font-heading leading-tight
          ${className}
        `}
        {...props}
      >
        {children}
      </HeadingComponent>
    );
  },
);

Heading.displayName = "Heading";

// Paragraph Component
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold";
  color?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

const paragraphSizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      size = "md",
      weight = "normal",
      color = "secondary",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <p
        ref={ref}
        className={`
          ${paragraphSizeStyles[size]}
          ${weightStyles[weight]}
          ${colorStyles[color]}
          font-sans leading-normal
          ${className}
        `}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = "Paragraph";

// Label Component
interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md";
  weight?: "medium" | "semibold";
  color?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  htmlFor?: string;
}

const labelSizeStyles = {
  sm: "text-xs",
  md: "text-sm",
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size = "md",
      weight = "medium",
      color = "secondary",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        ref={ref}
        className={`
          ${labelSizeStyles[size]}
          ${weightStyles[weight]}
          ${colorStyles[color]}
          font-sans leading-normal
          inline-block
          ${className}
        `}
        {...props}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = "Label";

// Small/Caption Component
interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ color = "tertiary", className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          text-xs
          ${colorStyles[color]}
          font-sans leading-normal
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Caption.displayName = "Caption";
