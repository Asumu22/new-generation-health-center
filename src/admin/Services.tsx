import React, { useEffect, useState } from "react";
import { serviceService } from "../services/services";
import { uploadService } from "../services/upload";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { ServiceItem } from "../types";
import { Helmet } from "react-helmet-async";
import { resolveImageUrl } from "../lib/image";
import { IMAGES } from "../constants/images";

const Services = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(
    null,
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.hash = "#/admin/login";
      return;
    }
    if (isAdmin) {
      fetchServices();
    }
  }, [authLoading, isAdmin]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await serviceService.getAll();
      setServices(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load services";
      setError(message);
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image,
      };
      if (editingService) {
        await serviceService.update(editingService.id, payload);
      } else {
        await serviceService.create(payload);
      }
      setShowForm(false);
      setEditingService(null);
      setFormData({ title: "", description: "", image: "" });
      fetchServices();
      addToast("Service saved successfully.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save service";
      setError(message);
      addToast(message, "error");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadService.uploadImage(file);
      setFormData({ ...formData, image: res.url });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to upload image. Please try again.";
      setError(message);
      addToast(message, "error");
    }
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || "",
      image: service.image_url || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await serviceService.delete(id);
      fetchServices();
      addToast("Service deleted successfully.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete service";
      setError(message);
      addToast(message, "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Services | New Generation Health Center</title>
        <meta
          name="description"
          content="Manage services offered by New Generation Health Center."
        />
      </Helmet>
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => {
              setShowForm(true);
              setEditingService(null);
              setFormData({ title: "", description: "", image: "" });
            }}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200"
          >
            Add Service
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.15s]" />
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]" />
            </div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No services added yet. Click "Add Service" to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div
                key={s.id}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500"
              >
                <div className="text-4xl mb-6 bg-gray-50 group-hover:bg-blue-500 w-16 h-16 flex items-center justify-center rounded-2xl transition-colors">
                  {s.image_url ? (
                    <img
                      src={resolveImageUrl(s.image_url, IMAGES.serviceCheckup)}
                      alt={s.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    "🏥"
                  )}
                </div>
                <h4 className="font-bold text-xl text-gray-900 group-hover:text-white mb-2 leading-tight">
                  {s.title}
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-blue-200 mb-6 line-clamp-2">
                  {s.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-200">
                    Service
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="text-xs text-blue-600 font-bold uppercase tracking-widest hover:underline"
                    >
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-xs text-red-500 font-bold uppercase tracking-widest hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="font-black text-gray-900 text-lg mb-6">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full mt-1 p-3 rounded-xl border border-gray-100 text-sm"
                    placeholder="Primary Care"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                    className="w-full mt-1 p-3 rounded-xl border border-gray-100 text-sm"
                    placeholder="Service description..."
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Service Icon/Image
                  </label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                      {formData.image ? (
                        <img
                          src={resolveImageUrl(formData.image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-300 text-xs font-bold">
                          No Image
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="service-image-upload"
                      />
                      <label
                        htmlFor="service-image-upload"
                        className="inline-block px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-blue-100 transition-colors"
                      >
                        Upload Photo
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full mt-3 p-3 rounded-xl border border-gray-100 text-xs text-gray-400 bg-gray-50/50"
                    placeholder="Or paste image URL directly..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-100 text-gray-600 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
                  >
                    {editingService ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Services;
