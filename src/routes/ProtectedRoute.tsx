import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      window.location.hash = "#/admin/login";
    }
  }, [loading, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="inline-flex items-center gap-2 text-sm text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" />
          Loading secure admin console...
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
};
