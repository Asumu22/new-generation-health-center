import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

const getSiteUrl = () => {
  const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

export const SEO = ({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: SEOProps) => {
  const baseUrl = getSiteUrl();
  const canonicalUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const imageUrl = image
    ? `${baseUrl}${image.startsWith("/") ? image : image}`
    : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: title,
    description,
    url: canonicalUrl,
    image: imageUrl,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
