// API Service Layer for New Generation Health Center
// Handles all communication with the backend

const BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:4300";
const API_BASE_URL = `${BASE_URL}/api`;

export const getImageUrl = (url: string | null | undefined) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  return `${BASE_URL}${url}`;
};

// Helper function for making requests
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("adminToken");

  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Set JSON content type by default, but let browser set boundary for FormData
  if (!(options.body instanceof FormData)) {
    (headers as any)["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
}

// ==================== AUTH ====================

export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI<{
      token: string;
      admin: { id: string; name: string; email: string };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () =>
    fetchAPI<{ id: string; name: string; email: string; createdAt: string }>(
      "/auth/profile",
      {
        method: "GET",
      },
    ),

  updateProfile: (data: {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }) =>
    fetchAPI<{ message: string }>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ==================== APPOINTMENTS ====================

export interface Appointment {
  id: string;
  fullName: string;
  email: string | null;
  phone: string;
  service: string;
  date: string | null;
  time: string | null;
  message: string | null;
  type: "consultation" | "quote";
  status: "Pending" | "Contacted" | "Completed";
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentStats {
  total: number;
  pending: number;
  contacted: number;
  completed: number;
  recent: Appointment[];
}

export const appointmentAPI = {
  // Public - create appointment
  create: (data: {
    fullName: string;
    phone: string;
    service: string;
    email?: string;
    date?: string;
    time?: string;
    message?: string;
    type?: "consultation" | "quote";
  }) =>
    fetchAPI<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Admin - get all appointments
  getAll: (params?: { status?: string; type?: string; search?: string }) => {
    const query = new URLSearchParams(
      params as Record<string, string>,
    ).toString();
    return fetchAPI<Appointment[]>(`/appointments${query ? `?${query}` : ""}`, {
      method: "GET",
    });
  },

  // Admin - get appointment by ID
  getById: (id: string) =>
    fetchAPI<Appointment>(`/appointments/${id}`, {
      method: "GET",
    }),

  // Admin - update appointment
  update: (id: string, data: Partial<Appointment>) =>
    fetchAPI<Appointment>(`/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Admin - delete appointment
  delete: (id: string) =>
    fetchAPI<{ message: string }>(`/appointments/${id}`, {
      method: "DELETE",
    }),

  // Admin - get stats
  getStats: () =>
    fetchAPI<AppointmentStats>("/appointments/stats/dashboard", {
      method: "GET",
    }),
};

// ==================== MESSAGES ====================

export interface Message {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export const messageAPI = {
  // Public - create message
  create: (data: {
    fullName: string;
    email: string;
    message: string;
    phone?: string;
    subject?: string;
  }) =>
    fetchAPI<Message>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Admin - get all messages
  getAll: (params?: { search?: string }) => {
    const query = new URLSearchParams(
      params as Record<string, string>,
    ).toString();
    return fetchAPI<Message[]>(`/contact${query ? `?${query}` : ""}`, {
      method: "GET",
    });
  },

  // Admin - get message by ID
  getById: (id: string) =>
    fetchAPI<Message>(`/contact/${id}`, {
      method: "GET",
    }),

  // Admin - delete message
  delete: (id: string) =>
    fetchAPI<{ message: string }>(`/contact/${id}`, {
      method: "DELETE",
    }),

  // Admin - get stats
  getStats: () =>
    fetchAPI<{ total: number; recent: Message[] }>("/contact/stats/dashboard", {
      method: "GET",
    }),
};

// ==================== NEWSLETTER ====================

export const newsletterAPI = {
  subscribe: (email: string) =>
    fetchAPI<{ message: string; subscription: any }>("/contact/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

// ==================== DOCTORS ====================

export interface Doctor {
  id: string;
  name: string;
  title: string;
  experience: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export const doctorAPI = {
  // Public - get all doctors
  getAll: () =>
    fetchAPI<Doctor[]>("/doctors", {
      method: "GET",
    }),

  // Admin - create doctor
  create: (data: {
    name: string;
    title: string;
    experience?: string;
    image?: string;
  }) =>
    fetchAPI<Doctor>("/doctors", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Admin - update doctor
  update: (id: string, data: Partial<Doctor>) =>
    fetchAPI<Doctor>(`/doctors/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Admin - delete doctor
  delete: (id: string) =>
    fetchAPI<{ message: string }>(`/doctors/${id}`, {
      method: "DELETE",
    }),

  // Admin - get count
  getCount: () =>
    fetchAPI<{ count: number }>("/doctors/stats/count", {
      method: "GET",
    }),
};

// ==================== SERVICES ====================

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export const serviceAPI = {
  // Public - get all services
  getAll: () =>
    fetchAPI<Service[]>("/services", {
      method: "GET",
    }),

  // Admin - create service
  create: (data: { title: string; description: string; image?: string }) =>
    fetchAPI<Service>("/services", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Admin - update service
  update: (id: string, data: Partial<Service>) =>
    fetchAPI<Service>(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Admin - delete service
  delete: (id: string) =>
    fetchAPI<{ message: string }>(`/services/${id}`, {
      method: "DELETE",
    }),
};

// ==================== CMS CONTENT ====================

export interface SiteContent {
  global: {
    clinicName: string;
    clinicDescription: string;
    phone: string;
    email: string;
    address: string;
    workingHours: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
  };
  landing_page: any;
  about_page: any;
  contact_page: any;
}

export const contentAPI = {
  // Public - get all content
  getAll: () =>
    fetchAPI<SiteContent>("/content", {
      method: "GET",
    }),

  // Public - get content by key
  getByKey: (key: string) =>
    fetchAPI<any>(`/content/${key}`, {
      method: "GET",
    }),

  // Admin - update content
  update: (key: string, value: any) =>
    fetchAPI<any>(`/content/${key}`, {
      method: "PUT",
      body: JSON.stringify(value),
    }),

  // Admin - upload image
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return fetchAPI<{ url: string; message: string }>("/content/upload", {
      method: "POST",
      body: formData,
    });
  },
};

// ==================== UTILITIES ====================

export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("adminToken");
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  },

  // Set auth data
  setAuth: (
    token: string,
    user: { id: string; name: string; email: string },
  ): void => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify(user));
  },

  // Get auth data
  getAuth: (): {
    token: string;
    user: { id: string; name: string; email: string };
  } | null => {
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");
    if (token && userStr) {
      return { token, user: JSON.parse(userStr) };
    }
    return null;
  },
};

export default {
  auth: authAPI,
  appointments: appointmentAPI,
  newsletter: newsletterAPI,
  messages: messageAPI,
  doctors: doctorAPI,
  services: serviceAPI,
  content: contentAPI,
  utils: apiUtils,
};
