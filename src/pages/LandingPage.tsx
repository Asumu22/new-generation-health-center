import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button, ConsultationForm } from "../components";
import { SEO } from "../components/SEO";
import { IMAGES } from "../constants/images";
import { contentService } from "../services/content";
import { serviceService } from "../services/services";
import { resolveImageUrl } from "../lib/image";
import { getPageDescription, getPageTitle } from "../lib/seo";
import type { ServiceItem } from "../types";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  scaleHover,
  imageHover,
  transition,
} from "./animations";

// Default fallback content
const DEFAULT_CONTENT = {
  hero: {
    badge: "Trusted care for every family",
    title: "With You, For Your Loved Ones",
    description:
      "Compassionate medical care across every stage of life, delivered with clarity, comfort, and confidence.",
    image: "",
    doctor: {
      name: "Dr. Amelia Carter",
      title: "Senior Care Specialist",
      image: "",
      description:
        "Expert nurse practitioners and physicians working together to give your loved ones the highest quality care.",
    },
    stats: [
      { value: "10+", label: "years of experience" },
      { value: "7+", label: "trusted specialists" },
      { value: "1000+", label: "patients cared for" },
      { value: "24/7", label: "care and support" },
    ],
  },
  servicesSection: {
    badge: "Because Your Family Matters To Us",
    title: "Care built around your family's needs.",
    items: [
      {
        title: "In-home care support",
        description:
          "One-on-one nursing care and daily wellness support at home.",
        image: "",
      },
      {
        title: "24/7 professional nurses",
        description:
          "Continuous care coordination for urgent moments and routine health checks.",
        image: "",
      },
      {
        title: "Senior & family wellness",
        description:
          "Holistic programs that strengthen independence and everyday comfort.",
        image: "",
      },
    ],
  },
  highlights: {
    badge: "Care Made Just For You",
    title: "Services designed to keep your family healthy and supported.",
    description:
      "From routine checkups to condition-specific support, our team provides expert care with personal attention.",
  },
  dailyCare: {
    badge: "A glimpse into our daily care",
    title: "Attention to every detail, every day.",
    image: "",
  },
  statsSection: {
    stats: [
      { label: "Patients cared for", value: "500+" },
      { label: "Active care plans", value: "120+" },
      { label: "Clinicians on duty", value: "30+" },
      { label: "Support available", value: "24/7" },
    ],
  },
  approach: {
    badge: "Our Quality-Driven Approach To Care",
    title: "Every plan is created to help families feel confident.",
    description:
      "We combine clinical expertise with empathy so your family receives the right support, every step of the way.",
    image: "",
    points: [
      "Comprehensive family assessments",
      "Clear communications with loved ones",
      "Holistic care coordination",
      "Trusted specialists in every field",
    ],
  },
  faq: {
    badge: "What Families Ask Most",
    title: "Answers to the questions that matter most.",
    image: "",
    items: [
      {
        question: "Can I book care for a loved one on short notice?",
        answer:
          "Yes. Our team is ready to support urgent needs and coordinate same-day care when available.",
      },
      {
        question: "Do you accept insurance and private pay?",
        answer:
          "We work with major insurers and offer flexible self-pay options to suit different families.",
      },
      {
        question: "What types of specialists are available?",
        answer:
          "Our care team includes primary care, geriatrics, rehabilitation support, and nursing specialists.",
      },
    ],
  },
  consultation: {
    badge: "Let's Find The Right Care Together",
    title: "Schedule a care consultation in minutes.",
    description:
      "Tell us what you need, and our care team will match your family with the right plan and provider.",
    image: "",
  },
};

export const LandingPage = () => {
  const [landingContent, setLandingContent] = useState(DEFAULT_CONTENT);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const pageContent = useMemo(
    () => ({
      hero: {
        ...DEFAULT_CONTENT.hero,
        ...(landingContent.hero || {}),
      },
      servicesSection: {
        ...DEFAULT_CONTENT.servicesSection,
        ...(landingContent.servicesSection || {}),
      },
      highlights: {
        ...DEFAULT_CONTENT.highlights,
        ...(landingContent.highlights || {}),
      },
      dailyCare: {
        ...DEFAULT_CONTENT.dailyCare,
        ...(landingContent.dailyCare || {}),
      },
      statsSection: {
        ...DEFAULT_CONTENT.statsSection,
        ...(landingContent.statsSection || {}),
      },
      approach: {
        ...DEFAULT_CONTENT.approach,
        ...(landingContent.approach || {}),
      },
      faq: {
        ...DEFAULT_CONTENT.faq,
        ...(landingContent.faq || {}),
      },
      consultation: {
        ...DEFAULT_CONTENT.consultation,
        ...(landingContent.consultation || {}),
      },
    }),
    [landingContent],
  );

  const pageTitle = getPageTitle("New Generation Health Center");
  const pageDescription = getPageDescription(
    pageContent.hero.description || DEFAULT_CONTENT.hero.description,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both in parallel to reduce load time and ensure progress
        const [contentData, servicesData] = await Promise.all([
          contentService.getAll().catch((err) => {
            console.error("Failed to load CMS content:", err);
            return null;
          }),
          serviceService.getAll().catch((err) => {
            console.error("Failed to load services:", err);
            return [];
          }),
        ]);

        if (contentData?.landing_page) {
          setLandingContent((prev) => ({
            ...prev,
            ...contentData.landing_page,
            hero: { ...prev.hero, ...(contentData.landing_page.hero || {}) },
            highlights: {
              ...prev.highlights,
              ...(contentData.landing_page.highlights || {}),
            },
            servicesSection: {
              ...prev.servicesSection,
              ...(contentData.landing_page.servicesSection || {}),
            },
            statsSection: {
              ...prev.statsSection,
              ...(contentData.landing_page.statsSection || {}),
            },
          }));
        }

        if (servicesData) {
          setServices(servicesData);
        }
      } catch (err) {
        console.error("Critical error during data fetch:", err);
      } finally {
        // This is now guaranteed to run regardless of which fetch failed
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to get image URL with fallback and optimized delivery params
  const getImage = (url: string | undefined, fallback: string) => {
    return resolveImageUrl(url, fallback, {
      width: 1200,
      quality: "auto",
      format: "auto",
    });
  };

  const serviceCards = useMemo(() => {
    if (services.length > 0) return services;
    return pageContent.servicesSection.items.map((item, idx) => ({
      id: `fallback-${idx}`,
      title: item.title || "Service",
      description: item.description || "",
      image_url: item.image || "",
      created_at: "",
      updated_at: "",
    }));
  }, [services, pageContent.servicesSection.items]);

  // Memoized stats to prevent unnecessary recalculations
  const heroStats = useMemo(
    () => landingContent.hero.stats || [],
    [landingContent.hero.stats],
  );

  if (loading) {
    return (
      <main className="bg-surface min-h-screen">
        <section className="mx-auto max-w-7xl px-6 py-20 animate-pulse">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="h-8 w-48 bg-slate-200 rounded-full" />
              <div className="h-16 w-full bg-slate-200 rounded-2xl" />
              <div className="h-24 w-3/4 bg-slate-200 rounded-2xl" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-slate-100 rounded-3xl" />
                ))}
              </div>
            </div>
            <div className="aspect-[4/5] bg-slate-100 rounded-[36px]" />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 h-64 bg-slate-50 rounded-[40px] animate-pulse" />
        </section>
      </main>
    );
  }

  const {
    hero,
    servicesSection,
    highlights,
    dailyCare,
    statsSection,
    approach,
    faq,
    consultation,
  } = pageContent;
  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/"
        image={getImage(hero.image, IMAGES.hero)}
      />
      <main className="bg-surface text-text-primary">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 -top-24 h-72 bg-primary/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-16 lg:py-28">
            <div className="grid gap-16 items-center lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  {hero.badge}
                </motion.div>

                <div className="space-y-6">
                  <motion.h1
                    variants={fadeUp}
                    className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
                  >
                    {hero.title}
                  </motion.h1>
                  <motion.p
                    variants={fadeUp}
                    className="max-w-2xl text-base leading-8 text-text-secondary sm:text-lg"
                  >
                    {hero.description}
                  </motion.p>
                </div>

                <motion.div
                  variants={fadeUp}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <a href="#consultation" className="inline-block">
                    <Button size="lg" className="shadow-xl">
                      Book Appointment
                    </Button>
                  </a>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {heroStats.map((stat: any, idx: number) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      className="rounded-3xl bg-slate-50 px-4 py-4 text-center"
                    >
                      <p className="text-2xl font-semibold text-slate-950">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <motion.div
                  whileHover="hover"
                  className="overflow-hidden rounded-[36px] border border-border bg-slate-100 shadow-soft"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <motion.img
                      variants={imageHover}
                      src={getImage(hero.image, IMAGES.hero)}
                      alt="Medical provider with patient"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: 0.8 }}
                  className="absolute left-6 top-6 hidden w-64 rounded-[28px] border border-white/90 bg-white/95 p-4 shadow-2xl backdrop-blur lg:block"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getImage(hero.doctor?.image, IMAGES.doctorPrimary)}
                      alt={hero.doctor?.name || "Doctor portrait"}
                      loading="lazy"
                      className="h-14 w-14 rounded-3xl object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        {hero.doctor?.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {hero.doctor?.title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-text-secondary">
                    {hero.doctor?.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION (CMS-controlled) */}
        <section id="services" className="bg-surface py-16 sm:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="mx-auto max-w-3xl text-center">
              <motion.p
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-[0.3em] text-primary"
              >
                {servicesSection.badge}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl"
              >
                {servicesSection.title}
              </motion.h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {(servicesSection.items || []).map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={scaleHover.hover}
                  className="overflow-hidden rounded-[32px] bg-white shadow-soft"
                >
                  <motion.div className="aspect-[4/5] w-full overflow-hidden">
                    <motion.img
                      variants={imageHover}
                      src={getImage(card.image, IMAGES.serviceCheckup)}
                      alt={card.title || "Service preview image"}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  <div className="space-y-3 p-6">
                    <h3 className="text-xl font-semibold text-slate-950">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-6 text-text-secondary">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CARE MADE JUST FOR YOU SECTION (from Services API) */}
        <section className="bg-white py-16 sm:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="grid gap-8 xl:grid-cols-[1fr_0.85fr] xl:items-center">
              <div className="space-y-6">
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-primary"
                >
                  {highlights.badge}
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-semibold text-slate-950 sm:text-4xl "
                >
                  {highlights.title}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="max-w-2xl text-base leading-8 text-text-secondary"
                >
                  {highlights.description}
                </motion.p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={fadeUp}
                    whileHover="hover"
                    className="rounded-[28px] border border-border bg-slate-50 p-6 shadow-sm"
                  >
                    <motion.div
                      variants={scaleHover}
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary overflow-hidden"
                    >
                      {service.image_url ? (
                        <img
                          src={resolveImageUrl(
                            service.image_url,
                            IMAGES.serviceCheckup,
                          )}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">+</span>
                      )}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-slate-950 ">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* DAILY CARE SECTION (reuses hero doctor data) */}
        <section className="bg-surface py-16 sm:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="grid gap-10 xl:grid-cols-[0.95fr_0.85fr] xl:items-center">
              <motion.div
                variants={fadeIn}
                className="relative overflow-hidden rounded-[36px] bg-white shadow-soft"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={getImage(dailyCare.image, IMAGES.appointmentCTA)}
                    alt={dailyCare.title || "Care team during consultation"}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/0 to-transparent" />
                <div className="absolute left-6 bottom-6 rounded-[28px] bg-white/95 p-6 shadow-2xl backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary">
                    {dailyCare.badge}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                    {dailyCare.title}
                  </h3>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {(statsSection.stats || []).map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    whileHover="hover"
                    className="rounded-[28px] border border-border bg-white p-6 shadow-sm"
                  >
                    <motion.p
                      variants={scaleHover}
                      className="text-3xl font-semibold text-slate-950"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="mt-3 text-sm text-text-secondary">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* QUALITY-DRIVEN APPROACH SECTION */}
        <section className="bg-surface py-16 sm:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr] xl:items-center">
              <div className="space-y-6">
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-primary"
                >
                  {approach.badge}
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-semibold text-slate-950 sm:text-4xl"
                >
                  {approach.title}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="max-w-2xl text-base leading-8 text-text-secondary"
                >
                  {approach.description}
                </motion.p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {(approach.points || []).map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      whileHover={scaleHover.hover}
                      className="rounded-[28px] border border-border bg-white p-5 shadow-sm"
                    >
                      <p className="text-sm font-medium text-slate-950">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                variants={fadeIn}
                className="overflow-hidden rounded-[36px] bg-white shadow-soft"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={getImage(approach.image, IMAGES.aboutClinic)}
                    alt={approach.title || "Quality-driven care approach"}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-white py-16 sm:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_0.95fr] xl:items-start">
              <div className="space-y-6">
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-primary"
                >
                  {faq.badge}
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-semibold text-slate-950 sm:text-4xl"
                >
                  {faq.title}
                </motion.h2>
                <div className="space-y-3">
                  {(faq.items || []).map((item, idx) => (
                    <motion.details
                      key={idx}
                      variants={fadeUp}
                      className="rounded-[28px] border border-border bg-slate-50 p-5"
                    >
                      <summary className="cursor-pointer text-base font-semibold text-slate-950">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-text-secondary">
                        {item.answer}
                      </p>
                    </motion.details>
                  ))}
                </div>
              </div>

              <motion.div
                variants={fadeIn}
                className="overflow-hidden rounded-[36px] bg-slate-50 shadow-soft"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={getImage(faq.image, IMAGES.clinicInterior)}
                    alt={faq.title || "Healthcare interior scene"}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CONSULTATION SECTION */}
        <section
          id="consultation"
          className="relative overflow-hidden bg-[#0F1B3A] py-16 sm:py-20"
        >
          <div className="absolute inset-0 opacity-50">
            <img
              src={getImage(consultation.image, IMAGES.appointmentCTA)}
              alt={consultation.title || "Appointment background"}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/75" />
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto max-w-7xl px-6"
          >
            <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr] xl:items-center">
              <div className="space-y-6 text-white">
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80"
                >
                  {consultation.badge}
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-semibold sm:text-4xl"
                >
                  {consultation.title}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="max-w-2xl text-base leading-8 text-slate-200"
                >
                  {consultation.description}
                </motion.p>
              </div>

              <motion.div
                variants={fadeUp}
                className="rounded-[36px] border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur sm:p-10"
              >
                <ConsultationForm />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};
