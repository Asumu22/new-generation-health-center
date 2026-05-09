import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../components/Button";
import { SEO } from "../components/SEO";
import { SendMessageForm } from "../components/SendMessageForm";
import { IMAGES } from "../constants/images";
import { fadeUp, staggerContainer, scaleHover, fadeIn } from "./animations";
import { contentService } from "../services/content";
import { newsletterService } from "../services/newsletter";
import { resolveImageUrl } from "../lib/image";
import { getPageTitle, getPageDescription } from "../lib/seo";
import type { SiteContent } from "../types";

const DEFAULT_CONTACT_CONTENT = {
  hero: {
    title: "Get In Touch With Us",
    description:
      "Share your details and questions, and our team will reach out with the right guidance.",
    image: "",
  },
  form: {
    title: "Send us a Message",
    description:
      "Fill out the form below and we'll get back to you as soon as possible.",
  },
  location: {
    mapImage: "",
  },
  newsletter: {
    title: "Stay Updated With Direlda",
    description: "Get the latest care news, tips, and resources.",
  },
  info: {
    phone: "+1 (800) 456-7890",
    email: "care@newgenhealth.com",
    address: "Molyko, Buea",
    workingHours: "Mon - Sat: 09.00 AM - 08.00 PM",
  },
};

export const ContactPage = () => {
  const [globalContent, setGlobalContent] = useState<
    SiteContent["global"] | null
  >(null);
  const [contactPageContent, setContactPageContent] = useState<
    SiteContent["contact_page"] | null
  >(DEFAULT_CONTACT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const contactInfo = useMemo(
    () => ({
      phone: globalContent?.phone || DEFAULT_CONTACT_CONTENT.info.phone,
      email: globalContent?.email || DEFAULT_CONTACT_CONTENT.info.email,
      address: globalContent?.address || DEFAULT_CONTACT_CONTENT.info.address,
      workingHours:
        globalContent?.workingHours ||
        DEFAULT_CONTACT_CONTENT.info.workingHours,
    }),
    [globalContent],
  );

  const pageContent = useMemo(
    () => ({
      hero: {
        ...DEFAULT_CONTACT_CONTENT.hero,
        ...(contactPageContent?.hero || {}),
      },
      form: {
        ...DEFAULT_CONTACT_CONTENT.form,
        ...(contactPageContent?.form || {}),
      },
      info: {
        ...DEFAULT_CONTACT_CONTENT.info,
        ...(contactPageContent?.info || {}),
      },
      newsletter: {
        ...DEFAULT_CONTACT_CONTENT.newsletter,
        ...(contactPageContent?.newsletter || {}),
      },
    }),
    [contactPageContent],
  );

  const pageTitle = getPageTitle("Contact Us");
  const pageDescription = getPageDescription(
    pageContent.hero.description || DEFAULT_CONTACT_CONTENT.hero.description,
  );

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const allContent = await contentService.getAll();
        console.log("Contact page fetched content:", allContent);
        setGlobalContent(allContent.global || null);

        // Check if contact_page has actual content, not just an empty object
        const contactPageData = allContent.contact_page;
        if (contactPageData && Object.keys(contactPageData).length > 0) {
          setContactPageContent(contactPageData);
        } else {
          setContactPageContent(DEFAULT_CONTACT_CONTENT);
        }
      } catch (err) {
        console.error("ContactPage: Failed to load content:", err);
        setError("Failed to load content. Using defaults.");
        setContactPageContent(DEFAULT_CONTACT_CONTENT);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeMessage("");
    try {
      await newsletterService.subscribe(email);
      setSubscribeMessage("Successfully subscribed!");
      setEmail("");
    } catch (err) {
      setSubscribeMessage("Failed to subscribe. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/contact"
        image={resolveImageUrl(pageContent.hero.image, IMAGES.contactHero)}
      />
      <main className="bg-surface text-text-primary">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 top-0 h-72 bg-primary/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 items-center lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                  Contact
                </span>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-tight">
                  {pageContent.hero.title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                  {pageContent.hero.description}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-[40px] border border-border bg-slate-100 shadow-soft"
              >
                <div className="aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={resolveImageUrl(
                      pageContent.hero.image,
                      IMAGES.contactHero,
                    )}
                    alt={
                      pageContent.hero.title ||
                      "Contact New Generation Health Center"
                    }
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20 sm:py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
          >
            <div className="mx-auto max-w-3xl text-center">
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-semibold text-slate-950 sm:text-4xl"
              >
                {pageContent.form.title}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-8 text-text-secondary"
              >
                {pageContent.form.description}
              </motion.p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                variants={fadeUp}
                whileHover={scaleHover.hover}
                className="rounded-[32px] border border-border bg-white p-6 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10">
                  <img
                    src={IMAGES.iconPhone}
                    alt="Phone icon"
                    className="h-6 w-6"
                  />
                </div>
                <p className="mt-6 text-sm font-semibold text-slate-950">
                  Phone
                </p>
                <p className="mt-3 text-base leading-7 text-text-secondary">
                  {contactInfo.phone}
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                whileHover={scaleHover.hover}
                className="rounded-[32px] border border-border bg-white p-6 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10">
                  <img
                    src={IMAGES.iconEmail}
                    alt="Mail icon"
                    className="h-6 w-6"
                  />
                </div>
                <p className="mt-6 text-sm font-semibold text-slate-950">
                  Email
                </p>
                <p className="mt-3 text-base leading-7 text-text-secondary">
                  {contactInfo.email}
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                whileHover={scaleHover.hover}
                className="rounded-[32px] border border-border bg-white p-6 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10">
                  <img
                    src={IMAGES.iconLocation}
                    alt="Office Hours icon"
                    className="h-6 w-6"
                  />
                </div>
                <p className="mt-6 text-sm font-semibold text-slate-950">
                  Office Hours
                </p>
                <p className="mt-3 text-base leading-7 text-text-secondary">
                  {contactInfo.workingHours}
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                whileHover={scaleHover.hover}
                className="rounded-[32px] border border-border bg-white p-6 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10">
                  <img
                    src={IMAGES.iconLocation}
                    alt="Location icon"
                    className="h-6 w-6"
                  />
                </div>
                <p className="mt-6 text-sm font-semibold text-slate-950">
                  Location
                </p>
                <p className="mt-3 text-base leading-7 text-text-secondary">
                  {contactInfo.address}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-10 xl:grid-cols-[0.95fr_0.9fr] xl:items-start">
              <div className="overflow-hidden rounded-[36px] border border-border bg-slate-50 shadow-soft">
                <div className="overflow-hidden rounded-[32px] bg-white">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img // Map image
                      src={resolveImageUrl(
                        (contactPageContent as any)?.location?.mapImage,
                        IMAGES.contactMap,
                      )}
                      alt="Static map of Molyko, Buea"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-[32px] bg-white p-8 shadow-soft sm:p-10">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                        Address
                      </p>
                      <p className="mt-4 text-base leading-7 text-text-secondary">
                        {contactInfo.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                        Opening Hours
                      </p>
                      <p className="mt-4 text-base leading-7 text-text-secondary">
                        {contactInfo.workingHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[36px] border border-border bg-white p-8 shadow-2xl sm:p-10">
                <SendMessageForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="rounded-[36px] bg-white p-8 shadow-soft sm:p-10 lg:p-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                    {pageContent.newsletter.title}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">
                    {pageContent.newsletter.description}
                  </h3>
                </div>
                <form
                  onSubmit={handleNewsletterSubscribe}
                  className="grid gap-3 sm:flex sm:items-center"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[28px] border border-border bg-slate-50 px-4 py-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-80"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    disabled={!email}
                    className="w-full sm:w-auto"
                  >
                    Subscribe Now
                  </Button>
                  <AnimatePresence>
                    {subscribeMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-sm mt-2 ${subscribeMessage.includes("Successfully") ? "text-green-600" : "text-red-500"}`}
                      >
                        {subscribeMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
