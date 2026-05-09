import React from "react";

// @ts-ignore
import logoHorizontal from "../assets/logo_horizontal.png";
// @ts-ignore
import logoStacked from "../assets/logonghcstack1.png";
// @ts-ignore
import logoFav from "../assets/logo_fav.png";

interface LogoProps {
  /**
   * 'admin' variant for sidebar specific behavior
   */
  variant?: "default" | "admin";
  /**
   * Used for the Admin Panel sidebar collapse state
   */
  isCollapsed?: boolean;
  /**
   * Additional wrapper classes
   */
  className?: string;
}

/**
 * Logo component that automatically switches assets based on breakpoints.
 * Desktop (lg+): logo_horizontal | h-14
 * Tablet (md): logonghcstack1 | h-12
 * Mobile (sm-): logo_fav | h-10
 */
const Logo: React.FC<LogoProps> = ({
  variant = "default",
  isCollapsed = false,
  className = "",
}) => {
  const altText = "New Generation Health Center";

  if (variant === "admin") {
    return (
      <div
        className={`flex items-center justify-center transition-all duration-300 ${className}`}
      >
        <img
          src={isCollapsed ? logoFav : logoHorizontal}
          alt={altText}
          className={`${isCollapsed ? "h-10" : "h-14"} object-contain`}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {/* Mobile Logo (sm and below) */}
      <img
        src={logoFav}
        alt={altText}
        className="block md:hidden h-10 object-contain"
      />
      {/* Tablet Logo (md) */}
      <img
        src={logoStacked}
        alt={altText}
        className="hidden md:block lg:hidden h-12 object-contain"
      />
      {/* Desktop Logo (lg and above) */}
      <img
        src={logoHorizontal}
        alt={altText}
        className="hidden lg:block h-14 object-contain"
      />
    </div>
  );
};

export default Logo;
