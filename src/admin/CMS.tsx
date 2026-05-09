import React, { useEffect, useState } from "react";
import { contentService } from "../services/content";
import { uploadService } from "../services/upload";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { Helmet } from "react-helmet-async";
import { resolveImageUrl } from "../lib/image";

type ContentSection = "global" | "landing_page" | "about_page" | "contact_page";

const Accordion = ({ title, children, isOpen, onToggle }: any) => (
  <div className="border border-gray-100 rounded-[32px] overflow-hidden mb-6 bg-white shadow-sm transition-all duration-300">
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
        isOpen ? "bg-blue-50/40" : "bg-white hover:bg-gray-50"
      }`}
    >
      <span
        className={`font-black text-[10px] uppercase tracking-[0.2em] ${isOpen ? "text-blue-600" : "text-gray-500"}`}
      >
        {title}
      </span>
      <div
        className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-blue-600 text-white rotate-180 shadow-lg shadow-blue-500/20" : "bg-gray-100 text-gray-400"}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>
    {isOpen && (
      <div className="p-8 space-y-10 border-t border-gray-50/50 animate-fade-in">
        {children}
      </div>
    )}
  </div>
);

const FormInput = ({ label, className = "", ...props }: any) => {
  const id =
    label?.toLowerCase().replace(/\s+/g, "-") +
    Math.random().toString(36).substr(2, 4);
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full p-4 rounded-[20px] border border-gray-100 bg-gray-50/30 text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300"
      />
    </div>
  );
};

const FormTextArea = ({ label, className = "", ...props }: any) => {
  const id =
    label?.toLowerCase().replace(/\s+/g, "-") +
    Math.random().toString(36).substr(2, 4);
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className="w-full p-4 rounded-[24px] border border-gray-100 bg-gray-50/30 text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300 min-h-[100px]"
      />
    </div>
  );
};

const ImageUploadField = ({ label, value, onUpload, className = "" }: any) => {
  const inputId = `upload-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 p-6 bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200">
        <div className="w-32 h-24 bg-white rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center relative shadow-sm group">
          {value ? (
            <img
              src={resolveImageUrl(value)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt=""
            />
          ) : (
            <div className="text-gray-300 text-[10px] font-black uppercase text-center p-2">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="file"
              className="hidden"
              id={inputId}
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && onUpload(e.target.files[0])
              }
            />
            <label
              htmlFor={inputId}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-blue-600 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              Change Photo
            </label>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter truncate max-w-[200px]">
            {value
              ? `Path: ...${value.split("/").pop()}`
              : "Recommended: 1200x800px"}
          </p>
        </div>
      </div>
    </div>
  );
};

const CMS = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [activeSection, setActiveSection] = useState<ContentSection>("global");
  const [openPanels, setOpenPanels] = useState<Record<string, string | null>>({
    landing_page: "hero",
    about_page: "hero",
    contact_page: "hero",
    global: "clinic_info",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [content, setContent] = useState<any>({
    global: {
      clinicName: "",
      clinicDescription: "",
      phone: "",
      email: "",
      address: "",
      workingHours: "",
    },
    landing_page: {
      hero: {
        badge: "",
        title: "",
        description: "",
        image: "",
        doctor: { name: "", title: "", image: "", description: "" },
        stats: [
          { value: "30+", label: "years of experience" },
          { value: "120+", label: "trusted specialists" },
          { value: "500+", label: "families supported" },
          { value: "24/7", label: "care coordination" },
        ],
      },
      servicesSection: {
        badge: "",
        title: "",
        items: [
          { title: "", description: "", image: "" },
          { title: "", description: "", image: "" },
          { title: "", description: "", image: "" },
        ],
      },
      highlights: {
        badge: "Care Made Just For You",
        title: "Services designed to keep your family healthy and supported.",
        description:
          "From routine checkups to condition-specific support, our team provides expert care with personal attention.",
      },
      dailyCare: {
        badge: "",
        title: "",
        image: "",
      },
      statsSection: {
        stats: [
          { value: "500+", label: "Patients cared for" },
          { value: "120+", label: "Active care plans" },
          { value: "30+", label: "Clinicians on duty" },
          { value: "24/7", label: "Support available" },
        ],
      },
      approach: {
        badge: "",
        title: "",
        description: "",
        image: "",
        points: ["", "", "", ""],
      },
      faq: {
        badge: "",
        title: "",
        image: "",
        items: [
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
        ],
      },
      consultation: {
        badge: "",
        title: "",
        description: "",
        image: "",
      },
    },
    about_page: {
      hero: { title: "", description: "", image: "" },
      purpose: {
        title: "",
        description: "",
        image: "",
        vision: "",
        mission: "",
      },
      milestones: { title: "", description: "", items: [] },
      facilities: { title: "", description: "", items: [] },
      team: { title: "", description: "" },
    },
    contact_page: {
      hero: { title: "", description: "", image: "" },
      location: { mapImage: "" },
      newsletter: { title: "", description: "" },
    },
  } as any);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.hash = "#/admin/login";
      return;
    }
    if (isAdmin) {
      fetchContent();
    }
  }, [authLoading, isAdmin]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const data = await contentService.getAll();
      setContent((prev: any) => ({
        global: { ...prev.global, ...(data.global || {}) },
        landing_page: { ...prev.landing_page, ...(data.landing_page || {}) },
        about_page: { ...prev.about_page, ...(data.about_page || {}) },
        contact_page: { ...prev.contact_page, ...(data.contact_page || {}) },
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content");
      addToast(
        err instanceof Error ? err.message : "Failed to load content",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePanel = (panelId: string) => {
    setOpenPanels((prev) => ({
      ...prev,
      [activeSection]: prev[activeSection] === panelId ? null : panelId,
    }));
  };

  const handleImageUpload = async (
    section: ContentSection,
    fieldPath: string, // e.g., "hero.image" or "location.mapImage"
    file: File,
  ) => {
    try {
      const res = await uploadService.uploadImage(file);
      updateDeepField(section, fieldPath, res.url);
      setSuccess("Image uploaded successfully!");
      addToast("Image uploaded successfully!", "success");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Image upload failed";
      setError(message);
      addToast(message, "error");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await contentService.upsert(activeSection, content[activeSection]);
      setSuccess("Content saved successfully!");
      addToast("Content saved successfully!", "success");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save content";
      setError(message);
      addToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (
    section: ContentSection,
    field: string,
    value: string,
  ) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateNestedField = (
    // This is for array items like services
    section: ContentSection,
    parent: string,
    index: number,
    field: string,
    value: string,
  ) => {
    setContent((prev: any) => {
      const updatedParent = [...(prev[section][parent] || [])];
      updatedParent[index] = { ...updatedParent[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [parent]: updatedParent,
        },
      };
    });
  };

  // Helper to update deeply nested fields
  const updateDeepField = (
    section: ContentSection,
    fieldPath: string,
    value: any,
  ) => {
    setContent((prev: any) => {
      const parts = fieldPath.split(".");

      const updateNested = (obj: any, pathParts: string[]): any => {
        const [currentPart, ...rest] = pathParts;
        const index = Number(currentPart);
        const isArrayIndex = String(index) === currentPart;

        if (rest.length === 0) {
          if (isArrayIndex) {
            const arr = Array.isArray(obj) ? [...obj] : [];
            arr[index] = value;
            return arr;
          }
          return { ...obj, [currentPart]: value };
        }

        const nextPart = rest[0];
        const nextIndex = Number(nextPart);
        const nextIsArray = String(nextIndex) === nextPart;

        const currentValue = obj?.[currentPart];
        const child =
          currentValue !== undefined ? currentValue : nextIsArray ? [] : {};

        const updatedChild = updateNested(child, rest);

        if (isArrayIndex) {
          const arr = Array.isArray(obj) ? [...obj] : [];
          arr[index] = updatedChild;
          return arr;
        }

        return {
          ...obj,
          [currentPart]: updatedChild,
        };
      };

      return {
        ...prev,
        [section]: updateNested(prev[section] || {}, parts),
      };
    });
  };

  const sections = [
    { key: "global", label: "Global Settings", icon: "⚙️" },
    { key: "landing_page", label: "Landing Page", icon: "🏠" },
    { key: "about_page", label: "About Page", icon: "📄" },
    { key: "contact_page", label: "Contact Page", icon: "📞" },
  ] as const;

  const renderForm = () => {
    switch (activeSection) {
      case "global":
        return (
          <div className="space-y-6">
            <h3 className="font-black text-gray-900 text-lg px-1">
              Global Settings
            </h3>

            <Accordion
              title="Clinic Information"
              isOpen={openPanels.global === "clinic_info"}
              onToggle={() => togglePanel("clinic_info")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label="Clinic Name"
                  value={content.global.clinicName || ""}
                  onChange={(e: any) =>
                    updateField("global", "clinicName", e.target.value)
                  }
                />
                <FormInput
                  label="Phone Number"
                  value={content.global.phone || ""}
                  onChange={(e: any) =>
                    updateField("global", "phone", e.target.value)
                  }
                />
                <FormInput
                  label="Contact Email"
                  type="email"
                  value={content.global.email || ""}
                  onChange={(e: any) =>
                    updateField("global", "email", e.target.value)
                  }
                />
                <FormInput
                  label="Office Address"
                  value={content.global.address || ""}
                  onChange={(e: any) =>
                    updateField("global", "address", e.target.value)
                  }
                />
                <FormTextArea
                  label="Clinic Description"
                  className="md:col-span-2"
                  value={content.global.clinicDescription || ""}
                  onChange={(e: any) =>
                    updateField("global", "clinicDescription", e.target.value)
                  }
                  rows={3}
                />
                <FormInput
                  label="Working Hours"
                  className="md:col-span-2"
                  value={content.global.workingHours || ""}
                  onChange={(e: any) =>
                    updateField("global", "workingHours", e.target.value)
                  }
                  placeholder="Mon - Sat: 09.00 AM - 20.00 PM"
                />
              </div>
            </Accordion>
          </div>
        );

      case "landing_page":
        return (
          <div className="space-y-6">
            <h3 className="font-black text-gray-900 text-lg px-1">
              Landing Page Content
            </h3>

            {/* HERO SECTION */}
            <Accordion
              title="Hero Section"
              isOpen={openPanels.landing_page === "hero"}
              onToggle={() => togglePanel("hero")}
            >
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Hero Badge"
                    value={content.landing_page.hero?.badge || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "hero.badge",
                        e.target.value,
                      )
                    }
                  />
                  <FormInput
                    label="Hero Title"
                    value={content.landing_page.hero?.title || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "hero.title",
                        e.target.value,
                      )
                    }
                  />
                  <FormTextArea
                    label="Hero Description"
                    className="md:col-span-2"
                    value={content.landing_page.hero?.description || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "hero.description",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <ImageUploadField
                  label="Main Hero Background"
                  value={content.landing_page.hero?.image}
                  onUpload={(file: File) =>
                    handleImageUpload("landing_page", "hero.image", file)
                  }
                />

                <div className="p-8 bg-slate-900 rounded-[40px] space-y-8 shadow-xl">
                  <h4 className="font-black text-white text-[10px] uppercase tracking-[0.2em] opacity-40 px-1">
                    Floating Doctor Card
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <FormInput
                        label="Doctor Name"
                        value={content.landing_page.hero?.doctor?.name || ""}
                        onChange={(e: any) =>
                          updateDeepField(
                            "landing_page",
                            "hero.doctor.name",
                            e.target.value,
                          )
                        }
                        className="!space-y-1.5"
                      />
                      <FormInput
                        label="Doctor Professional Title"
                        value={content.landing_page.hero?.doctor?.title || ""}
                        onChange={(e: any) =>
                          updateDeepField(
                            "landing_page",
                            "hero.doctor.title",
                            e.target.value,
                          )
                        }
                        className="!space-y-1.5"
                      />
                    </div>
                    <ImageUploadField
                      label="Doctor Portrait"
                      value={content.landing_page.hero?.doctor?.image}
                      onUpload={(file: File) =>
                        handleImageUpload(
                          "landing_page",
                          "hero.doctor.image",
                          file,
                        )
                      }
                    />
                  </div>
                  <FormTextArea
                    label="Short Bio / Description"
                    value={content.landing_page.hero?.doctor?.description || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "hero.doctor.description",
                        e.target.value,
                      )
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-6 pt-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 px-1">
                    Key Statistics (4 Cards)
                  </label>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(Array.isArray(content.landing_page.hero?.stats)
                      ? content.landing_page.hero.stats
                      : []
                    ).map((s: any, i: number) => (
                      <div
                        key={i}
                        className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3"
                      >
                        <FormInput
                          label="Value"
                          value={s?.value || ""}
                          onChange={(e: any) =>
                            updateDeepField(
                              "landing_page",
                              `hero.stats.${i}.value`,
                              e.target.value,
                            )
                          }
                        />
                        <FormInput
                          label="Label"
                          value={s?.label || ""}
                          onChange={(e: any) =>
                            updateDeepField(
                              "landing_page",
                              `hero.stats.${i}.label`,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>

            {/* SERVICES SECTION (CMS-controlled) */}
            <Accordion
              title="Services Section (Because Your Family Matters To Us)"
              isOpen={openPanels.landing_page === "servicesSection"}
              onToggle={() => togglePanel("servicesSection")}
            >
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Section Badge"
                    value={content.landing_page.servicesSection?.badge || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "servicesSection.badge",
                        e.target.value,
                      )
                    }
                  />
                  <FormInput
                    label="Section Headline"
                    value={content.landing_page.servicesSection?.title || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "servicesSection.title",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {(Array.isArray(content.landing_page.servicesSection?.items)
                    ? content.landing_page.servicesSection.items
                    : []
                  ).map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 relative group transition-all hover:shadow-md"
                    >
                      <div className="absolute -top-3 left-8 px-4 py-1.5 bg-white border border-gray-100 rounded-full text-[9px] font-black uppercase text-blue-600 shadow-sm tracking-widest">
                        Card #{idx + 1}
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-2">
                        <div className="space-y-6">
                          <FormInput
                            label="Title"
                            value={item.title}
                            onChange={(e: any) => {
                              const items = [
                                ...(content.landing_page.servicesSection
                                  ?.items || []),
                              ];
                              items[idx] = {
                                ...items[idx],
                                title: e.target.value,
                              };
                              updateDeepField(
                                "landing_page",
                                "servicesSection.items",
                                items,
                              );
                            }}
                          />
                          <FormTextArea
                            label="Description"
                            value={item.description}
                            rows={3}
                            onChange={(e: any) => {
                              const items = [
                                ...(content.landing_page.servicesSection
                                  ?.items || []),
                              ];
                              items[idx] = {
                                ...items[idx],
                                description: e.target.value,
                              };
                              updateDeepField(
                                "landing_page",
                                "servicesSection.items",
                                items,
                              );
                            }}
                          />
                        </div>
                        <ImageUploadField
                          label="Card Illustration"
                          value={item.image}
                          onUpload={(file: File) =>
                            handleImageUpload(
                              "landing_page",
                              `servicesSection.items.${idx}.image`,
                              file,
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>

            {/* HIGHLIGHTS SECTION (Care Made Just For You) */}
            <Accordion
              title="Highlights Section (Care Made Just For You)"
              isOpen={openPanels.landing_page === "highlights"}
              onToggle={() => togglePanel("highlights")}
            >
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Section Badge"
                    value={content.landing_page.highlights?.badge || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "highlights.badge",
                        e.target.value,
                      )
                    }
                  />
                  <FormInput
                    label="Section Title"
                    value={content.landing_page.highlights?.title || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "highlights.title",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <FormTextArea
                  label="Section Description"
                  value={content.landing_page.highlights?.description || ""}
                  onChange={(e: any) =>
                    updateDeepField(
                      "landing_page",
                      "highlights.description",
                      e.target.value,
                    )
                  }
                  rows={3}
                />
                <p className="text-xs text-gray-400 italic">
                  Note: Service cards in this section are pulled from the
                  Services database (not CMS).
                </p>
              </div>
            </Accordion>

            {/* DAILY CARE SECTION */}
            <Accordion
              title="Daily Care Section (A Glimpse Into Our Daily Care)"
              isOpen={openPanels.landing_page === "dailyCare"}
              onToggle={() => togglePanel("dailyCare")}
            >
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Section Badge"
                    value={content.landing_page.dailyCare?.badge || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "dailyCare.badge",
                        e.target.value,
                      )
                    }
                  />
                  <FormInput
                    label="Section Title"
                    value={content.landing_page.dailyCare?.title || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "dailyCare.title",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <ImageUploadField
                  label="Section Background Image"
                  value={content.landing_page.dailyCare?.image}
                  onUpload={(file: File) =>
                    handleImageUpload("landing_page", "dailyCare.image", file)
                  }
                />
                <p className="text-xs text-gray-400 italic">
                  Note: The overlay card reuses hero doctor data (no separate
                  fields needed).
                </p>
              </div>
            </Accordion>

            {/* STATS SECTION */}
            <Accordion
              title="Stats Section (Right Side Cards)"
              isOpen={openPanels.landing_page === "statsSection"}
              onToggle={() => togglePanel("statsSection")}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(Array.isArray(content.landing_page.statsSection?.stats)
                    ? content.landing_page.statsSection.stats
                    : []
                  ).map((s: any, i: number) => (
                    <div
                      key={i}
                      className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3"
                    >
                      <FormInput
                        label="Value"
                        value={s?.value || ""}
                        onChange={(e: any) =>
                          updateDeepField(
                            "landing_page",
                            `statsSection.stats.${i}.value`,
                            e.target.value,
                          )
                        }
                      />
                      <FormInput
                        label="Label"
                        value={s?.label || ""}
                        onChange={(e: any) =>
                          updateDeepField(
                            "landing_page",
                            `statsSection.stats.${i}.label`,
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>

            {/* APPROACH SECTION */}
            <Accordion
              title="Approach Section (Quality-Driven Approach To Care)"
              isOpen={openPanels.landing_page === "approach"}
              onToggle={() => togglePanel("approach")}
            >
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div className="space-y-8">
                    <FormInput
                      label="Approach Badge"
                      value={content.landing_page.approach?.badge || ""}
                      onChange={(e: any) =>
                        updateDeepField(
                          "landing_page",
                          "approach.badge",
                          e.target.value,
                        )
                      }
                    />
                    <FormInput
                      label="Approach Title"
                      value={content.landing_page.approach?.title || ""}
                      onChange={(e: any) =>
                        updateDeepField(
                          "landing_page",
                          "approach.title",
                          e.target.value,
                        )
                      }
                    />
                    <FormTextArea
                      label="Detailed Description"
                      value={content.landing_page.approach?.description || ""}
                      onChange={(e: any) =>
                        updateDeepField(
                          "landing_page",
                          "approach.description",
                          e.target.value,
                        )
                      }
                      rows={5}
                    />
                  </div>
                  <ImageUploadField
                    label="Approach Graphic"
                    value={content.landing_page.approach?.image}
                    onUpload={(file: File) =>
                      handleImageUpload("landing_page", "approach.image", file)
                    }
                  />
                </div>

                <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm space-y-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                    Quality Highlights (List)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(Array.isArray(content.landing_page.approach?.points)
                      ? content.landing_page.approach.points
                      : []
                    ).map((p: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <FormInput
                          value={p}
                          className="flex-1"
                          onChange={(e: any) => {
                            const points = [
                              ...(content.landing_page.approach?.points || []),
                            ];
                            points[i] = e.target.value;
                            updateDeepField(
                              "landing_page",
                              "approach.points",
                              points,
                            );
                          }}
                        />
                        <button
                          onClick={() => {
                            const points = (
                              content.landing_page.approach?.points || []
                            ).filter((_: any, idx: number) => idx !== i);
                            updateDeepField(
                              "landing_page",
                              "approach.points",
                              points,
                            );
                          }}
                          className="w-12 h-12 mt-6 rounded-2xl flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const points = [
                          ...(content.landing_page.approach?.points || []),
                          "",
                        ];
                        updateDeepField(
                          "landing_page",
                          "approach.points",
                          points,
                        );
                      }}
                      className="text-xs font-bold text-blue-600 uppercase"
                    >
                      + Add Point
                    </button>
                  </div>
                </div>
              </div>
            </Accordion>

            {/* FAQ SECTION */}
            <Accordion
              title="FAQ Section (What Families Ask Most)"
              isOpen={openPanels.landing_page === "faq"}
              onToggle={() => togglePanel("faq")}
            >
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Section Badge"
                    value={content.landing_page.faq?.badge || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "faq.badge",
                        e.target.value,
                      )
                    }
                  />
                  <FormInput
                    label="Section Title"
                    value={content.landing_page.faq?.title || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "faq.title",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <ImageUploadField
                  label="FAQ Section Image"
                  value={content.landing_page.faq?.image}
                  onUpload={(file: File) =>
                    handleImageUpload("landing_page", "faq.image", file)
                  }
                />

                <div className="space-y-6">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 px-1">
                    FAQ Items
                  </label>
                  {(Array.isArray(content.landing_page.faq?.items)
                    ? content.landing_page.faq.items
                    : []
                  ).map((item: any, i: number) => (
                    <div
                      key={i}
                      className="p-6 bg-gray-50 rounded-2xl space-y-4 border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase text-gray-400">
                          Item #{i + 1}
                        </span>
                        <button
                          onClick={() => {
                            const items = (
                              content.landing_page.faq?.items || []
                            ).filter((_: any, idx: number) => idx !== i);
                            updateDeepField("landing_page", "faq.items", items);
                          }}
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all text-lg font-bold"
                        >
                          ×
                        </button>
                      </div>
                      <FormInput
                        label="Question"
                        value={item.question}
                        onChange={(e: any) => {
                          const items = [
                            ...(content.landing_page.faq?.items || []),
                          ];
                          items[i] = {
                            ...items[i],
                            question: e.target.value,
                          };
                          updateDeepField("landing_page", "faq.items", items);
                        }}
                      />
                      <FormTextArea
                        label="Answer"
                        value={item.answer}
                        rows={3}
                        onChange={(e: any) => {
                          const items = [
                            ...(content.landing_page.faq?.items || []),
                          ];
                          items[i] = { ...items[i], answer: e.target.value };
                          updateDeepField("landing_page", "faq.items", items);
                        }}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const items = [
                        ...(content.landing_page.faq?.items || []),
                        { question: "", answer: "" },
                      ];
                      updateDeepField("landing_page", "faq.items", items);
                    }}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
                  >
                    + Add FAQ Item
                  </button>
                </div>
              </div>
            </Accordion>

            {/* CONSULTATION SECTION */}
            <Accordion
              title="Consultation Section"
              isOpen={openPanels.landing_page === "consultation"}
              onToggle={() => togglePanel("consultation")}
            >
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Section Badge"
                    value={content.landing_page.consultation?.badge || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "consultation.badge",
                        e.target.value,
                      )
                    }
                  />
                  <FormInput
                    label="Section Title"
                    value={content.landing_page.consultation?.title || ""}
                    onChange={(e: any) =>
                      updateDeepField(
                        "landing_page",
                        "consultation.title",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <FormTextArea
                  label="Section Description"
                  value={content.landing_page.consultation?.description || ""}
                  onChange={(e: any) =>
                    updateDeepField(
                      "landing_page",
                      "consultation.description",
                      e.target.value,
                    )
                  }
                  rows={3}
                />
                <ImageUploadField
                  label="Background Image"
                  value={content.landing_page.consultation?.image}
                  onUpload={(file: File) =>
                    handleImageUpload(
                      "landing_page",
                      "consultation.image",
                      file,
                    )
                  }
                />
                <p className="text-xs text-gray-400 italic">
                  Note: The consultation form itself is not editable from CMS.
                </p>
              </div>
            </Accordion>
          </div>
        );

      case "about_page":
        return (
          <div className="space-y-6">
            <h3 className="font-black text-gray-900 text-lg">
              About Page Content
            </h3>
            <div className="space-y-6">
              {/* Hero Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">Hero Section</h4>
                <input
                  type="text"
                  placeholder="Hero Title"
                  value={content.about_page.hero?.title || ""}
                  onChange={(e) =>
                    updateDeepField("about_page", "hero.title", e.target.value)
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <textarea
                  placeholder="Hero Subtitle / Description"
                  value={content.about_page.hero?.description || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "hero.description",
                      e.target.value,
                    )
                  }
                  rows={2}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-100">
                    {content.about_page.hero?.image && (
                      <img
                        src={resolveImageUrl(content.about_page.hero.image)}
                        className="w-full h-full object-cover"
                        alt="Hero"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleImageUpload(
                        "about_page",
                        "hero.image",
                        e.target.files[0],
                      )
                    }
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Vision & Mission Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">
                  Vision & Mission Section
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={content.about_page.purpose?.title || ""}
                    onChange={(e) =>
                      updateDeepField(
                        "about_page",
                        "purpose.title",
                        e.target.value,
                      )
                    }
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Section Subtitle"
                    value={content.about_page.purpose?.description || ""}
                    onChange={(e) =>
                      updateDeepField(
                        "about_page",
                        "purpose.description",
                        e.target.value,
                      )
                    }
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <textarea
                  placeholder="Vision Statement"
                  value={content.about_page.purpose?.vision || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "purpose.vision",
                      e.target.value,
                    )
                  }
                  rows={3}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <textarea
                  placeholder="Mission Statement"
                  value={content.about_page.purpose?.mission || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "purpose.mission",
                      e.target.value,
                    )
                  }
                  rows={3}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-100">
                    {content.about_page.purpose?.image && (
                      <img
                        src={resolveImageUrl(content.about_page.purpose.image)}
                        className="w-full h-full object-cover"
                        alt="Purpose"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleImageUpload(
                        "about_page",
                        "purpose.image",
                        e.target.files[0],
                      )
                    }
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Milestones Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">Milestones Section</h4>
                <input
                  type="text"
                  placeholder="Section Title"
                  value={content.about_page.milestones?.title || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "milestones.title",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <input
                  type="text"
                  placeholder="Section Subtitle"
                  value={content.about_page.milestones?.description || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "milestones.description",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />

                <div className="space-y-3">
                  {(Array.isArray(content.about_page.milestones?.items)
                    ? content.about_page.milestones.items
                    : []
                  ).map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-gray-100"
                    >
                      <input
                        type="text"
                        placeholder="Year"
                        value={item.year || ""}
                        onChange={(e) => {
                          const currentItems = Array.isArray(
                            content.about_page.milestones,
                          )
                            ? content.about_page.milestones
                            : content.about_page.milestones?.items || [];
                          const newItems = [...currentItems];
                          newItems[idx] = {
                            ...newItems[idx],
                            year: e.target.value,
                          };
                          updateDeepField(
                            "about_page",
                            "milestones.items",
                            newItems,
                          );
                        }}
                        className="w-20 p-2 border-b text-sm font-black"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.label || ""}
                        onChange={(e) => {
                          const currentItems = Array.isArray(
                            content.about_page.milestones,
                          )
                            ? content.about_page.milestones
                            : content.about_page.milestones?.items || [];
                          const newItems = [...currentItems];
                          newItems[idx] = {
                            ...newItems[idx],
                            label: e.target.value,
                          };
                          updateDeepField(
                            "about_page",
                            "milestones.items",
                            newItems,
                          );
                        }}
                        className="flex-1 p-2 border-b text-sm"
                      />
                      <button
                        onClick={() => {
                          const currentItems = Array.isArray(
                            content.about_page.milestones,
                          )
                            ? content.about_page.milestones
                            : content.about_page.milestones?.items || [];
                          const newItems = currentItems.filter(
                            (_: any, i: number) => i !== idx,
                          );
                          updateDeepField(
                            "about_page",
                            "milestones.items",
                            newItems,
                          );
                        }}
                        className="text-red-400 hover:text-red-600 transition-colors px-2"
                        title="Delete Milestone"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const currentItems = Array.isArray(
                        content.about_page.milestones,
                      )
                        ? content.about_page.milestones
                        : content.about_page.milestones?.items || [];
                      const items = [
                        ...currentItems,
                        { year: "", label: "", image: "" },
                      ];
                      updateDeepField("about_page", "milestones.items", items);
                    }}
                    className="text-xs font-bold text-blue-600 uppercase tracking-widest"
                  >
                    + Add Milestone
                  </button>
                </div>
              </div>

              {/* Facilities Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">Facilities Section</h4>
                <input
                  type="text"
                  placeholder="Section Title"
                  value={content.about_page.facilities?.title || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "facilities.title",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <textarea
                  placeholder="Section Subtitle"
                  value={content.about_page.facilities?.description || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "facilities.description",
                      e.target.value,
                    )
                  }
                  rows={2}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <th className="pb-3 px-2 w-16 text-center">#</th>
                        <th className="pb-3 px-2">Image</th>
                        <th className="pb-3 px-2">Title / Description</th>
                        <th className="pb-3 px-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(Array.isArray(content.about_page.facilities?.items)
                        ? content.about_page.facilities.items
                        : []
                      ).map((item: any, idx: number) => (
                        <tr key={idx} className="group">
                          <td className="py-4 px-2 align-top">
                            <input
                              type="text"
                              value={item.number}
                              onChange={(e) => {
                                const currentItems = Array.isArray(
                                  content.about_page.facilities,
                                )
                                  ? content.about_page.facilities
                                  : content.about_page.facilities?.items || [];
                                const newItems = [...currentItems];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  number: e.target.value,
                                };
                                updateDeepField(
                                  "about_page",
                                  "facilities.items",
                                  newItems,
                                );
                              }}
                              className="w-full text-center p-2 border rounded-lg text-xs"
                            />
                          </td>
                          <td className="py-4 px-2 align-top">
                            <div className="space-y-2">
                              <div className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                {item.image && (
                                  <img
                                    src={resolveImageUrl(item.image)}
                                    className="w-full h-full object-cover"
                                    alt=""
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                onChange={(e) =>
                                  e.target.files?.[0] &&
                                  handleImageUpload(
                                    "about_page",
                                    `facilities.items.${idx}.image`,
                                    e.target.files[0],
                                  )
                                }
                                className="block w-full text-[10px]"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-2 space-y-2 align-top">
                            <input
                              type="text"
                              placeholder="Title"
                              value={item.title}
                              onChange={(e) => {
                                const newItems = [
                                  ...(content.about_page.facilities?.items ||
                                    []),
                                ];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  title: e.target.value,
                                };
                                updateDeepField(
                                  "about_page",
                                  "facilities.items",
                                  newItems,
                                );
                              }}
                              className="w-full p-2 border rounded-lg text-sm font-bold"
                            />
                            <textarea
                              placeholder="Description"
                              value={item.description}
                              onChange={(e) => {
                                const newItems = [
                                  ...(content.about_page.facilities?.items ||
                                    []),
                                ];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  description: e.target.value,
                                };
                                updateDeepField(
                                  "about_page",
                                  "facilities.items",
                                  newItems,
                                );
                              }}
                              rows={2}
                              className="w-full p-2 border rounded-lg text-xs"
                            />
                          </td>
                          <td className="py-4 px-2 align-top">
                            <button
                              onClick={() => {
                                const items =
                                  content.about_page.facilities.items.filter(
                                    (_: any, i: number) => i !== idx,
                                  );
                                updateDeepField(
                                  "about_page",
                                  "facilities.items",
                                  items,
                                );
                              }}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      const items = [
                        ...(content.about_page.facilities?.items || []),
                        { number: "", title: "", description: "", image: "" },
                      ];
                      updateDeepField("about_page", "facilities.items", items);
                    }}
                    className="mt-4 text-xs font-bold text-blue-600 uppercase tracking-widest"
                  >
                    + Add Facility
                  </button>
                </div>
              </div>

              {/* Team Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">Team Section Header</h4>
                <input
                  type="text"
                  placeholder="Section Title"
                  value={content.about_page.team?.title || ""}
                  onChange={(e) =>
                    updateDeepField("about_page", "team.title", e.target.value)
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <textarea
                  placeholder="Section Description"
                  value={content.about_page.team?.description || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "about_page",
                      "team.description",
                      e.target.value,
                    )
                  }
                  rows={2}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
            </div>
          </div>
        );

      case "contact_page":
        return (
          <div className="space-y-6">
            <h3 className="font-black text-gray-900 text-lg">
              Contact Page Content
            </h3>
            <div className="space-y-6">
              {/* Hero Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">Hero Section</h4>
                <input
                  type="text"
                  placeholder="Hero Title"
                  value={content.contact_page.hero?.title || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "contact_page",
                      "hero.title",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <textarea
                  placeholder="Hero Description"
                  value={content.contact_page.hero?.description || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "contact_page",
                      "hero.description",
                      e.target.value,
                    )
                  }
                  rows={2}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {content.contact_page.hero?.image && (
                      <img
                        src={resolveImageUrl(content.contact_page.hero.image)}
                        className="w-full h-full object-cover"
                        alt="Hero"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleImageUpload(
                        "contact_page",
                        "hero.image",
                        e.target.files[0],
                      )
                    }
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Location Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">Location Section</h4>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {content.contact_page.location?.mapImage && (
                      <img
                        src={resolveImageUrl(
                          content.contact_page.location.mapImage,
                        )}
                        className="w-full h-full object-cover"
                        alt="Map"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleImageUpload(
                        "contact_page",
                        "location.mapImage",
                        e.target.files[0],
                      )
                    }
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                <h4 className="font-bold text-gray-700">Newsletter Section</h4>
                <input
                  type="text"
                  placeholder="Newsletter Title"
                  value={content.contact_page.newsletter?.title || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "contact_page",
                      "newsletter.title",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
                <textarea
                  placeholder="Newsletter Description"
                  value={content.contact_page.newsletter?.description || ""}
                  onChange={(e) =>
                    updateDeepField(
                      "contact_page",
                      "newsletter.description",
                      e.target.value,
                    )
                  }
                  rows={2}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>CMS | New Generation Health Center</title>
        <meta
          name="description"
          content="Content Management System for New Generation Health Center website."
        />
      </Helmet>
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm">
            {success}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0 lg:sticky lg:top-8 lg:h-fit">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                Content Sections
              </p>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
                {sections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() =>
                      setActiveSection(section.key as ContentSection)
                    }
                    className={`whitespace-nowrap lg:w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      activeSection === section.key
                        ? "bg-slate-900 text-white"
                        : "text-gray-500 hover:bg-gray-50 bg-gray-50/50 lg:bg-transparent"
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Form Container */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.15s]" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]" />
                  </div>
                </div>
              ) : (
                <>
                  {renderForm()}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 active:scale-95 transition-transform disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CMS;
