import React, { useState } from "react";
import { Button } from "./Button";
import { messageService } from "../services/messages";

interface SendMessageFormProps {
  className?: string;
}

export const SendMessageForm = ({ className = "" }: SendMessageFormProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await messageService.create({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject || null,
        message: formData.message,
      });
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.",
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
          <p className="font-semibold text-green-800">Message Sent!</p>
          <p className="mt-2 text-sm text-green-700">
            We'll respond within one business day.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="mt-4"
            onClick={() => setSuccess(false)}
          >
            Send Another Message
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
        Have a question or want to learn more? Send us a message and we'll
        respond within one business day.
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Full Name
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
        Email Address
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email address"
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Phone Number
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Subject
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter a subject"
          className="w-full rounded-[28px] border border-border bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-950">
        Message
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us how we can help you"
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
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};
