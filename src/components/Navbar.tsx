import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Logo } from "./"; // Import Logo
import { buttonHover } from "../pages/animations";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  clinicName?: string;
  navItems?: NavItem[];
  onCTAClick?: () => void;
}

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#/about" },
  { label: "Contact", href: "#/contact" },
];

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      clinicName = "New Generation Health Center",
      navItems = defaultNavItems,
      onCTAClick,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCTAClick = () => {
      if (onCTAClick) {
        onCTAClick();
      }
    };

    return (
      <nav
        ref={ref}
        className="sticky top-0 z-50 bg-white border-b border-border shadow-sm"
      >
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Clinic Name / Logo */}
            <div className="flex-shrink-0">
              <a href="#">
                <Logo className="h-10 sm:h-12" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="text-text-secondary font-medium text-base hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <motion.div
                whileHover={buttonHover.hover}
                whileTap={buttonHover.tap}
              >
                <Button variant="primary" size="md" onClick={handleCTAClick}>
                  Book Appointment
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={handleCTAClick}
                className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors duration-200"
              >
                Book
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:bg-surface hover:text-primary transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-border bg-white">
              <div className="px-4 pt-4 pb-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-text-secondary hover:bg-primary-light hover:text-primary rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 sm:hidden">
                  <button
                    onClick={() => {
                      handleCTAClick();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors duration-200"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
