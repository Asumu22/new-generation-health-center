import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SEO } from "../components/SEO";
import { Button } from "../components";
import { IMAGES } from "../constants/images";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  scaleHover,
  imageHover,
  transition,
} from "./animations";
import { contentService } from "../services/content";
import { doctorService } from "../services/doctors";
import { resolveImageUrl } from "../lib/image";
import { getPageTitle, getPageDescription } from "../lib/seo";
import type { SiteContent, Doctor } from "../types";

const DEFAULT_ABOUT_CONTENT: any = {
  hero: {
    title: "About Us",
    description:
      "Learn about our mission, vision, and the dedicated team at New Generation Health Center.",
    image: "",
  },
  purpose: {
    title: "Our Mission",
    description: "To provide compassionate, high-quality healthcare services.",
    image: "",
    vision: "",
    mission: "",
  },
  milestones: {
    title: "Our Journey",
    description: "Key moments in our history.",
    items: [],
  },
  facilities: {
    title: "Our Facilities",
    description: "Modern healthcare environment.",
    items: [],
  },
  team: {
    title: "Our Team",
    description: "Meet the dedicated professionals committed to your health.",
  },
};

export const AboutPage = () => {
  const [content, setContent] = useState<any>(DEFAULT_ABOUT_CONTENT);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageContent = useMemo(
    () => ({
      ...DEFAULT_ABOUT_CONTENT,
      ...content,
      hero: {
        ...DEFAULT_ABOUT_CONTENT.hero,
        ...(content?.hero || {}),
      },
      purpose: {
        ...DEFAULT_ABOUT_CONTENT.purpose,
        ...(content?.purpose || {}),
      },
      milestones: {
        ...DEFAULT_ABOUT_CONTENT.milestones,
        ...(content?.milestones || {}),
      },
      facilities: {
        ...DEFAULT_ABOUT_CONTENT.facilities,
        ...(content?.facilities || {}),
      },
      team: {
        ...DEFAULT_ABOUT_CONTENT.team,
        ...(content?.team || {}),
      },
    }),
    [content],
  );

  const pageTitle = getPageTitle(pageContent.hero.title || "About Our Clinic");
  const pageDescription = getPageDescription(
    pageContent.hero.description ||
      "Learn about our mission, vision, and the dedicated team at New Generation Health Center.",
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contentData, doctorsData] = await Promise.all([
          contentService.getByKey("about_page"),
          doctorService.getAll(),
        ]);

        // Check if contentData has actual content, not just an empty object
        if (contentData && Object.keys(contentData).length > 0) {
          setContent(contentData);
        } else {
          setContent(DEFAULT_ABOUT_CONTENT);
        }
        setDoctors(doctorsData || []);
      } catch (err) {
        setError("Failed to load page content.");
        console.error(err);
        setContent(DEFAULT_ABOUT_CONTENT);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="bg-surface min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-20 animate-pulse">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="h-8 w-32 bg-slate-200 rounded-full" />
              <div className="h-16 w-full bg-slate-200 rounded-2xl" />
              <div className="h-32 w-full bg-slate-200 rounded-2xl" />
            </div>
            <div className="aspect-video bg-slate-100 rounded-[40px]" />
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white rounded-[32px] shadow-sm" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/about"
        image={resolveImageUrl(pageContent.hero.image, IMAGES.servicesHero)}
      />
      <main id="about-page" className="bg-surface text-text-primary">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 top-0 h-72 bg-primary/10 blur-3xl" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24"
          >
            <div className="grid gap-10 items-center lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <motion.span
                  variants={fadeUp}
                  className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-primary"
                >
                  About Us
                </motion.span>
                <motion.h1
                  variants={fadeUp}
                  className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
                >
                  {(content?.hero as any)?.title || "The Heart Of Direlda"}
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="max-w-2xl text-base leading-8 text-text-secondary sm:text-lg"
                >
                  {(content?.hero as any)?.description ||
                    "We deliver clinical excellence through compassionate service, family-centered care, and a welcoming environment where every member of your loved one’s circle feels supported."}
                </motion.p>
              </div>
              <motion.div
                variants={fadeIn}
                className="relative overflow-hidden rounded-[40px] border border-border bg-slate-100 shadow-soft"
              >
                <motion.div
                  whileHover="hover"
                  className="aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden"
                >
                  <motion.img
                    variants={imageHover}
                    src={resolveImageUrl(
                      (content?.hero as any)?.image,
                      IMAGES.servicesHero,
                    )}
                    alt="Caregiver comforting a senior patient"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="our-purpose" className="bg-surface py-20 sm:py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
          >
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <motion.span
                  variants={fadeUp}
                  className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-primary"
                >
                  Vision & Mission
                </motion.span>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-semibold text-slate-950 sm:text-4xl"
                >
                  {(content?.purpose as any)?.title ||
                    "Our Purpose & Commitment"}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="max-w-xl text-base leading-8 text-text-secondary"
                >
                  {(content?.purpose as any)?.description ||
                    "We believe in the power of clear vision and unwavering dedication."}
                </motion.p>
              </div>

              <motion.div
                variants={fadeIn}
                className="overflow-hidden rounded-[36px] bg-white shadow-soft"
              >
                <motion.div
                  whileHover="hover"
                  className="aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2] lg:aspect-[4/3]"
                >
                  <motion.img
                    variants={imageHover}
                    src={resolveImageUrl(
                      (content?.purpose as any)?.image,
                      IMAGES.purposeImage,
                    )}
                    alt="Care team with family at a health facility"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>

              <div className="grid gap-4">
                <motion.div
                  variants={fadeUp}
                  whileHover={scaleHover.hover}
                  className="rounded-[28px] bg-white p-8 shadow-soft"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    Our Vision
                  </p>
                  <p className="mt-4 text-base leading-7 text-text-secondary">
                    {(content?.purpose as any)?.vision ||
                      "To be a welcoming and vibrant sanctuary where seniors find profound love, unparalleled dignity, and deep fulfillment."}
                  </p>
                </motion.div>
                <div className="rounded-[28px] bg-white p-8 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    Our Mission
                  </p>
                  <p className="mt-4 text-base leading-7 text-text-secondary">
                    {(content?.purpose as any)?.mission ||
                      "To provide personalized, compassionate nursing care that nurtures physical health, emotional well-being, and family connection."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="timeline" className="bg-surface py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                Milestones
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                {content?.milestones?.title || "Our Journey Of Care"}
              </h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                {content?.milestones?.description ||
                  "Celebrating the key moments that shaped Direlda into the trusted care partner it is today."}
              </p>
            </div>

            <div className="relative mt-16 mb-32 flex items-center justify-center min-h-[160px]">
              <div className="h-px w-full bg-border" />
              <div className="absolute inset-x-0 top-1/2 flex justify-around text-center">
                {(Array.isArray(content?.milestones)
                  ? content.milestones
                  : content?.milestones?.items || []
                ).map((milestone: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative transform -translate-y-1/2 flex flex-col items-center group"
                    style={{
                      width: `${100 / (content?.milestones?.items?.length || 4)}%`,
                    }}
                  >
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white border-2 border-primary/20 shadow-md flex items-center justify-center text-xl font-bold text-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      {milestone.year}
                    </div>
                    <div className="absolute top-full mt-2 w-full px-4">
                      <p className="text-[12px] leading-relaxed font-normal text-slate-900 line-clamp-4 max-w-[180px] mx-auto">
                        {milestone.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="facilities" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                Facilities
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                {content?.facilities?.title || "Our Facilities"}
              </h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                {content?.facilities?.description ||
                  "Designed for safety, comfort, and community connection."}
              </p>
            </div>

            <div className="mt-14 grid gap-8 xl:grid-cols-2">
              {(content?.facilities?.items || []).map(
                (facility: any, idx: number) => (
                  <div
                    key={idx}
                    className="grid gap-5 rounded-[36px] border border-border bg-slate-50 p-6 shadow-soft sm:grid-cols-[0.4fr_0.6fr] lg:p-8"
                  >
                    <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary font-semibold">
                        {facility.number}
                      </div>
                      <h3 className="text-xl font-semibold text-slate-950">
                        {facility.title}
                      </h3>
                      <p className="text-sm leading-7 text-text-secondary">
                        {facility.description}
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-[28px] bg-white">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={resolveImageUrl(
                            facility.image,
                            IMAGES.facility1,
                          )}
                          alt={facility.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="caregivers" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                Our Team
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                {(content?.team as any)?.title || "Meet Our Caregivers"}
              </h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                {(content?.team as any)?.description ||
                  "Experienced hands and warm hearts caring for your loved ones every day."}
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="space-y-4 text-center">
                  <div className="overflow-hidden rounded-[32px] border border-border bg-slate-50 shadow-soft">
                    <div className="aspect-[3/4] w-full overflow-hidden">
                      <img
                        src={resolveImageUrl(
                          doctor.image_url,
                          IMAGES.caregiver1,
                        )}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">
                      {doctor.name}
                    </p>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">
                      {doctor.title}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {doctor.experience}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
