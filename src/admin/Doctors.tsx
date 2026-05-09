import React, { useEffect, useState } from "react";
import { doctorService } from "../services/doctors";
import { uploadService } from "../services/upload";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { Doctor } from "../types";
import { Helmet } from "react-helmet-async";
import { resolveImageUrl } from "../lib/image";
import { IMAGES } from "../constants/images";

const Doctors = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    experience: "",
    image: "",
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.hash = "#/admin/login";
      return;
    }
    if (isAdmin) {
      fetchDoctors();
    }
  }, [authLoading, isAdmin]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await doctorService.getAll();
      setDoctors(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load doctors";
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
        name: formData.name,
        title: formData.title,
        experience: formData.experience,
        image_url: formData.image,
      };

      if (editingDoctor) {
        await doctorService.update(editingDoctor.id, payload);
      } else {
        await doctorService.create(payload);
      }
      setShowForm(false);
      setEditingDoctor(null);
      setFormData({ name: "", title: "", experience: "", image: "" });
      fetchDoctors();
      addToast("Doctor saved successfully.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save doctor";
      setError(message);
      addToast(message, "error");
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      title: doctor.title,
      experience: doctor.experience,
      image: doctor.image || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await doctorService.delete(id);
      fetchDoctors();
      addToast("Doctor deleted successfully.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete doctor";
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

  return (
    <>
      <Helmet>
        <title>Doctors | New Generation Health Center</title>
        <meta
          name="description"
          content="Manage doctor profiles for New Generation Health Center."
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
              setEditingDoctor(null);
              setFormData({ name: "", title: "", experience: "", image: "" });
            }}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200"
          >
            Add Doctor
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
        ) : doctors.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No doctors added yet. Click "Add Doctor" to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-3xl bg-slate-100 mb-6 flex items-center justify-center text-2xl font-black text-slate-400 rotate-3 group-hover:rotate-0 transition-transform">
                  {doc.image_url ? (
                    <img
                      src={resolveImageUrl(doc.image_url, IMAGES.caregiver1)}
                      alt={doc.name}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    doc.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                  )}
                </div>
                <h4 className="font-bold text-lg text-gray-900">{doc.name}</h4>
                <p className="text-sm font-semibold text-blue-600 mb-6">
                  {doc.title}
                </p>
                <div className="w-full pt-6 border-t border-gray-50 flex justify-between items-center mt-auto">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Experience
                  </span>
                  <span className="text-sm font-black text-gray-900">
                    {doc.experience || "N/A"}
                  </span>
                </div>
                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="text-xs text-blue-600 font-bold uppercase tracking-widest hover:underline"
                  >
                    Edit
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-xs text-red-500 font-bold uppercase tracking-widest hover:underline"
                  >
                    Delete
                  </button>
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
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full mt-1 p-3 rounded-xl border border-gray-100 text-sm"
                    placeholder="Dr. John Smith"
                  />
                </div>
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
                    placeholder="Cardiologist"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full mt-1 p-3 rounded-xl border border-gray-100 text-sm"
                    placeholder="15 years"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Doctor Portrait
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
                        id="doctor-image-upload"
                      />
                      <label
                        htmlFor="doctor-image-upload"
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
                    {editingDoctor ? "Update" : "Add"}
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

export default Doctors;
