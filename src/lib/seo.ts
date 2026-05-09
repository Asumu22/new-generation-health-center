const SITE_URL =
  (import.meta as any).env.VITE_SITE_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "https://example.com");

export const getCanonicalUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${normalizedPath}`;
};

export const getPageTitle = (pageTitle: string) =>
  `${pageTitle} | New Generation Health Center`;

export const getPageDescription = (description: string) =>
  description ||
  "New Generation Health Center delivers compassionate medical care with trusted experts, personalized plans, and responsive support for families.";

export const getStructuredHealthcareSchema = (options: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: options.name,
  description: options.description,
  url: options.url,
  telephone: options.telephone,
  email: options.email,
  address: options.address
    ? {
        "@type": "PostalAddress",
        streetAddress: options.address,
      }
    : undefined,
  sameAs: [
    "https://www.facebook.com/",
    "https://www.twitter.com/",
    "https://www.instagram.com/",
    "https://www.linkedin.com/",
  ],
});

export const getSocialMeta = (options: {
  title: string;
  description: string;
  url: string;
  image: string;
}) => ({
  title: options.title,
  description: options.description,
  url: options.url,
  image: options.image,
  type: "website",
  card: "summary_large_image",
});
