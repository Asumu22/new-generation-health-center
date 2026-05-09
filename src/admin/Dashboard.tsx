import React, { useEffect, useState } from "react";
import { appointmentService } from "../services/appointments";
import { messageService } from "../services/messages";
import { doctorService } from "../services/doctors";
import { useAuth } from "../hooks/useAuth";

interface DashboardStats {
  appointments: {
    total: number;
    pending: number;
    contacted: number;
    completed: number;
    recent: any[];
  };
  messages: {
    total: number;
    recent: any[];
  };
  doctors: {
    count: number;
  };
}

const Dashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [appointmentStats, messageStats, doctorCount] = await Promise.all(
          [
            appointmentService.getStats(),
            messageService.getStats(),
            doctorService.getCount(),
          ],
        );

        setStats({
          appointments: appointmentStats,
          messages: messageStats,
          doctors: { count: doctorCount },
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && !isAdmin) {
      window.location.hash = "#/admin/login";
      return;
    }

    if (isAdmin) {
      fetchStats();
    }
  }, [authLoading, isAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.15s]" />
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]" />
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Appointments",
      value: stats?.appointments.total || 0,
      trend: `${stats?.appointments.pending || 0} pending`,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending Appointments",
      value: stats?.appointments.pending || 0,
      trend: "Needs attention",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Total Messages",
      value: stats?.messages.total || 0,
      trend: "From contact form",
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Doctors",
      value: stats?.doctors.count || 0,
      trend: "Team members",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-10">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-hover hover:shadow-md"
          >
            <div
              className={`w-15 h-12 rounded-sm ${stat.color} flex items-center justify-center mb-4 font-bold text-2xl`}
            >
              {typeof stat.value === "number"
                ? stat.value
                : String(stat.value).charAt(0)}
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {stat.label}
            </p>
            {/* <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text-gray-900">
                {stat.value}
              </h3>
              <span className="text-xs font-bold px-2 py-1 bg-gray-50 rounded-lg text-gray-500">
                {stat.trend}
              </span>
            </div> */}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-6">Recent Appointments</h4>
          {stats?.appointments.recent.length ? (
            <div className="space-y-4">
              {stats.appointments.recent.slice(0, 5).map((apt: any) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {apt.full_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {apt.services?.title || "Unknown service"}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      apt.status === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : apt.status === "Contacted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No appointments yet.</p>
          )}
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-6">Recent Messages</h4>
          {stats?.messages.recent.length ? (
            <div className="space-y-4">
              {stats.messages.recent.slice(0, 5).map((msg: any) => (
                <div key={msg.id} className="flex gap-4">
                  <div className="w-1 bg-purple-500 rounded-full h-10" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {msg.full_name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {msg.subject || msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
