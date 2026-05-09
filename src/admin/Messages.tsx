import React, { useEffect, useState } from "react";
import { messageService } from "../services/messages";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { Message } from "../types";
import { Helmet } from "react-helmet-async";

const Messages = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.hash = "#/admin/login";
      return;
    }
    if (isAdmin) {
      fetchMessages();
    }
  }, [authLoading, isAdmin]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await messageService.getAll();
      setMessages(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load messages";
      setError(message);
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await messageService.delete(id);
      fetchMessages();
      setSelectedMsg(null);
      addToast("Message deleted successfully.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete message";
      setError(message);
      addToast(message, "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Messages | New Generation Health Center</title>
        <meta
          name="description"
          content="View and manage messages received by New Generation Health Center."
        />
      </Helmet>
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 flex justify-between items-center bg-white">
            <h3 className="font-black text-gray-900 tracking-tight text-lg">
              Messages
            </h3>
            <span className="text-sm text-gray-500">
              {messages.length} total
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
          ) : messages.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              No messages found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                    <th className="px-8 py-5">Sender</th>
                    <th className="px-8 py-5">Subject</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {messages.map((m) => (
                    <tr
                      key={m.id}
                      className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedMsg(m)}
                    >
                      <td className="px-8 py-6 font-bold text-gray-900">
                        {m.full_name}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-600">
                        {m.subject || "No subject"}
                      </td>
                      <td className="px-8 py-6 text-xs text-gray-400">
                        {new Date(m.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="opacity-0 group-hover:opacity-100 text-blue-600 font-bold text-xs uppercase tracking-widest">
                          View
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
        {selectedMsg && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-black text-gray-900 text-lg">
                  Message Details
                </h3>
                <button
                  onClick={() => setSelectedMsg(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    From
                  </label>
                  <p className="text-sm font-bold text-gray-900">
                    {selectedMsg.full_name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Email
                  </label>
                  <p className="text-sm text-gray-600">{selectedMsg.email}</p>
                </div>
                {selectedMsg.phone && (
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Phone
                    </label>
                    <p className="text-sm text-gray-600">{selectedMsg.phone}</p>
                  </div>
                )}
                {selectedMsg.subject && (
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Subject
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedMsg.subject}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Message
                  </label>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {selectedMsg.message}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Received
                  </label>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedMsg.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => handleDelete(selectedMsg.id)}
                  className="flex-1 py-3 rounded-xl border border-red-100 text-red-500 text-sm font-bold uppercase tracking-widest hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedMsg(null)}
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

export default Messages;
