import React, { useEffect, useState } from "react";
import { IMAGES } from "../constants/images";
// @ts-ignore
import logoHorizontal from "../assets/logo_horizontal.png";
import { contentService } from "../services/content";
import type { GlobalContent } from "../types/content";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  clinicName?: string;
  clinicDescription?: string;
  onContactClick?: () => void;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      clinicName = "New Generation Health Center",
      clinicDescription = "New Generation Health Centre is a legally authorized healthcare facility operating under the Ministry of Public Health, Cameroon. Authorization Number: 3274/A/ECP/MINSANTE",
      onContactClick,
    },
    ref,
  ) => {
    const [global, setGlobal] = useState<GlobalContent | null>(null);

    useEffect(() => {
      const fetchGlobal = async () => {
        try {
          const data = await contentService.getByKey("global");
          setGlobal(data as GlobalContent);
        } catch (e) {
          console.error("Footer: Failed to load global content", e);
        }
      };
      fetchGlobal();
    }, []);

    const companyLinks: FooterLink[] = [
      { label: "About Us", href: "#/about" },
      { label: "Our Team", href: "#" },
    ];

    const handleContactClick = () => {
      if (onContactClick) {
        onContactClick();
      }
    };

    // Dynamic values from CMS with fallbacks
    const displayPhone = global?.phone || "+1 (800) 456-7890";
    const displayEmail = global?.email || "care@newgenhealth.com";
    const displayAddress = global?.address || "Molyko, Buea";
    const displayHours = global?.workingHours || "Mon - Fri: 8:00 AM - 6:00 PM";
    const displayDescription = global?.clinicDescription || clinicDescription;
    const displayTitle = global?.clinicName || clinicName;

    return (
      <footer
        ref={ref}
        className="bg-secondary text-white pt-16 pb-8 sm:pt-20 lg:pt-24"
      >
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Column 1: About */}
            <div className="space-y-4">
              <div className="flex items-center">
                {/* <Logo className="h-12" /> */}
                <img
                  src={logoHorizontal}
                  alt="Logo footer"
                  className="block h-12 object-contain"
                />
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {displayDescription}
              </p>
            </div>
            {/* Column 2: Company */}
            <div>
              <h4 className="text-base font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Hours */}
            <div>
              <h4 className="text-base font-semibold mb-4">Contact</h4>
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex gap-3">
                  <img
                    src={IMAGES.iconPhone}
                    alt="Phone"
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Phone</p>
                    <a
                      href={`tel:${displayPhone.replace(/\s+/g, "")}`}
                      className="text-sm font-medium text-white hover:text-primary transition-colors duration-200"
                    >
                      {displayPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <img
                    src={IMAGES.iconEmail}
                    alt="Email"
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Email</p>
                    <a
                      href={`mailto:${displayEmail}`}
                      className="text-sm font-medium text-white hover:text-primary transition-colors duration-200"
                    >
                      {displayEmail}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-3">
                  <img
                    src={IMAGES.iconLocation}
                    alt="Location"
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Address</p>
                    <a
                      href="#/contact"
                      className="text-sm font-medium text-white hover:text-primary transition-colors duration-200"
                    >
                      {displayAddress}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-6 pt-4 border-t border-border border-opacity-20">
                <p className="text-xs font-semibold text-text-secondary mb-2">
                  HOURS
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-white">{displayHours}</p>
                  {!global?.workingHours && (
                    <p className="text-sm text-white">Sat - Sun: Closed</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border border-opacity-20 my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} {displayTitle}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = "Footer";
