import { contentService } from "./content";

export const faqService = {
  getAll: async () => {
    const landingPage = await contentService.getByKey("landing_page");
    return landingPage?.faq ?? null;
  },

  update: async (faq: unknown) => {
    const landingPage = (await contentService.getByKey("landing_page")) || {};
    const updatedPage = { ...landingPage, faq };
    return contentService.upsert("landing_page", updatedPage);
  },
};
