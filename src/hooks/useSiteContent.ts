import { useEffect, useState } from "react";
import { contentService } from "../services/content";
import type { ContentSectionKey, SiteContent } from "../types/content";

export const useSiteContent = <K extends ContentSectionKey>(
  key: K,
): {
  data: SiteContent[K] | null;
  loading: boolean;
  error: string;
} => {
  const [data, setData] = useState<SiteContent[K] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const result = await contentService.getByKey(key);
        if (isMounted) {
          setData(result as SiteContent[K] | null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load page content.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [key]);

  return { data, loading, error };
};
