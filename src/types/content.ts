export type ContentSectionKey =
  | "global"
  | "landing_page"
  | "about_page"
  | "contact_page";

export interface GlobalContent {
  clinicName: string;
  clinicDescription: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface SiteContent {
  global: GlobalContent;
  landing_page: Record<string, unknown>;
  about_page: Record<string, unknown>;
  contact_page: Record<string, unknown>;
}

export interface ContentSection {
  key: ContentSectionKey;
  content: Record<string, unknown>;
}
