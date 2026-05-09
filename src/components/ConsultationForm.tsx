import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { appointmentService } from "../services/appointments";
import { serviceService } from "../services/services";
import type { ServiceItem } from "../types";

interface ConsultationFormProps {
  buttonText?: string;
  className?: string;
}

export const ConsultationForm = ({
  buttonText = "Request consultation",
  className = "",
}: ConsultationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceId: "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAll();
        setServices(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, serviceId: data[0].id }));
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await appointmentService.create({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        service_id: formData.serviceId || null,
        date: formData.date || null,
        time: formData.time || null,
        message: formData.message,
        type: "consultation",
      });
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        serviceId: services[0]?.id || "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      console.error("Appointment submit error:", err);
      setError(
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null
            ? JSON.stringify(err)
            : "Failed to submit. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`space-y-5 ${className}`}>
        <div className="rounded-[28px] border border-green-200 bg-green-50 p-6 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="font-semibold text-green-800">Request Submitted!</p>
          <p className="mt-2 text-sm text-green-700">
            Our care team will reach out within one business day.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="mt-4"
            onClick={() => setSuccess(false)}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      {error && (
        <div className="rounded-[28px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-[28px] border border-border bg-slate-50 p-5 text-sm text-text-secondary">
        Please provide a few details and our care team will reach out within one
        business day.
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Full name
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Email address
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Phone number
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="(123) 456-7890"
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Service needed
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          disabled={servicesLoading}
        >
          {servicesLoading ? (
            <option>Loading services...</option>
          ) : (
            services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))
          )}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-950">
          Preferred date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-950">
          Preferred time
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Additional details
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us a little about your needs"
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Submitting..." : buttonText}
      </Button>
    </form>
  );
};
