import React, { useEffect, useState } from "react";
import { appointmentService } from "../services/appointments";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { Appointment } from "../types";
import { Helmet } from "react-helmet-async";

const Appointments = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<
    "all" | "Pending" | "Contacted" | "Completed"
  >("all");
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.hash = "#/admin/login";
      return;
    }
    if (isAdmin) {
      fetchAppointments();
    }
  }, [filter, authLoading, isAdmin]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await appointmentService.getAll(
        filter !== "all" ? { status: filter } : undefined,
      );
      setAppointments(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load appointments";
      setError(message);
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    status: "Pending" | "Contacted" | "Completed",
  ) => {
    try {
      await appointmentService.update(id, { status });
      fetchAppointments();
      setSelectedApt(null);
      addToast("Appointment status updated.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update status";
      setError(message);
      addToast(message, "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await appointmentService.delete(id);
      fetchAppointments();
      addToast("Appointment deleted.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete appointment";
      setError(message);
      addToast(message, "error");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-orange-50 text-orange-600";
      case "Contacted":
        return "bg-blue-50 text-blue-600";
      case "Completed":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <Helmet>
        <title>Appointments | New Generation Health Center</title>
        <meta
          name="description"
          content="Manage patient appointments for New Generation Health Center."
        />
      </Helmet>
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-3">
          {["all", "Pending", "Contacted", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
                filter === status
                  ? "bg-slate-900 text-white"
                  : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 flex justify-between items-center bg-white">
            <h3 className="font-black text-gray-900 tracking-tight text-lg">
              Appointments
            </h3>
            <span className="text-sm text-gray-500">
              {appointments.length} total
            </span>
          </div>

          {loading ? (
            <div className="p-12 flex justify-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.15s]" />
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]" />
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              No appointments found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-y border-gray-50">
                  <tr>
                    <th className="px-8 py-5">Patient</th>
                    <th className="px-8 py-5">Contact</th>
                    <th className="px-8 py-5">Service</th>
                    <th className="px-8 py-5">Date & Time</th>
                    <th className="px-8 py-5">Type</th>
                    <th className="px-8 py-5">State</th>
                    <th className="px-8 py-5 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6 text-sm font-bold text-gray-900">
                        {apt.full_name}
                      </td>
                      <td className="px-8 py-6 text-xs text-gray-500">
                        <div>{apt.phone}</div>
                        {apt.email && (
                          <div className="text-gray-400">{apt.email}</div>
                        )}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-600">
                        {apt.services?.title || "N/A"}
                      </td>
                      <td className="px-8 py-6 text-xs text-gray-500 font-medium">
                        {apt.date
                          ? new Date(apt.date).toLocaleDateString()
                          : "Not set"}
                        {apt.time && (
                          <>
                            {" "}
                            <span className="mx-2 text-gray-200">|</span>{" "}
                            {apt.time}
                          </>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tighter bg-gray-100 text-gray-600">
                          {apt.type}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tighter ${getStatusColor(
                            apt.status,
                          )}`}
                        >
                          • {apt.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => setSelectedApt(apt)}
                          className="text-gray-300 hover:text-blue-600 font-black text-lg transition-colors"
                        >
                          •••
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedApt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-black text-gray-900 text-lg">
                  Appointment Details
                </h3>
                <button
                  onClick={() => setSelectedApt(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Name
                  </label>
                  <p className="text-sm font-bold text-gray-900">
                    {selectedApt.full_name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Phone
                  </label>
                  <p className="text-sm text-gray-600">{selectedApt.phone}</p>
                </div>
                {selectedApt.email && (
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Email
                    </label>
                    <p className="text-sm text-gray-600">{selectedApt.email}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Service
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedApt.service_id || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Date & Time
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedApt.date
                      ? new Date(selectedApt.date).toLocaleDateString()
                      : "Not set"}
                    {selectedApt.time && ` at ${selectedApt.time}`}
                  </p>
                </div>
                {selectedApt.message && (
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Message
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedApt.message}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </label>
                  <select
                    value={selectedApt.status}
                    onChange={(e) =>
                      handleStatusUpdate(selectedApt.id, e.target.value as any)
                    }
                    className="w-full mt-1 p-3 rounded-xl border border-gray-100 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => handleDelete(selectedApt.id)}
                  className="flex-1 py-3 rounded-xl border border-red-100 text-red-500 text-sm font-bold uppercase tracking-widest hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedApt(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Appointments;
