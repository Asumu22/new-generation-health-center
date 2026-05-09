import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Logo } from "../components";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, isAdmin, loading, error: authError } = useAuth();
  const { addToast } = useToast();
  const [view, setView] = useState<"login" | "forgot">("login");
  const [resetSent, setResetSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      window.location.hash = "#/admin/dashboard";
    }
  }, [isAdmin]);

  const handleLogin = async (values: LoginFormValues) => {
    setSubmitError(null);
    try {
      await signIn(values.email, values.password);
      addToast("Welcome back. Redirecting to the admin dashboard.", "success");
      window.location.hash = "#/admin/dashboard";
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      setSubmitError(message);
      addToast(message, "error");
    }
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setResetSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px]"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/5 p-12 border border-gray-100">
          <Helmet>
            <title>Admin Login | New Generation Health Center</title>
            <meta
              name="description"
              content="Admin panel login for New Generation Health Center."
            />
          </Helmet>
          <div className="text-center mb-10">
            <div className="mx-auto mb-6">
              <Logo variant="admin" isCollapsed={false} className="h-16" />
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
              Management Portal
            </p>
          </div>

          <AnimatePresence mode="wait">
            {view === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                    placeholder="email@example.com"
                    className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 uppercase tracking-[0.2em]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setView("forgot");
                        setSubmitError(null);
                      }}
                      className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters.",
                      },
                    })}
                    placeholder="••••••••"
                    className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500 uppercase tracking-[0.2em]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {(submitError || authError) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
                  >
                    {submitError || authError}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.15s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.3s]" />
                    </span>
                  ) : (
                    "Authorize Access"
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleResetRequest}
                className="space-y-6"
              >
                {resetSent ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-green-600 text-xl font-bold">
                        ✓
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      Reset Link Sent
                    </p>
                    <p className="text-xs text-gray-500 font-medium px-4">
                      Instructions have been sent to your email address.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Recovery Identity
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address.",
                          },
                        })}
                        placeholder="email@example.com"
                        className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 uppercase tracking-[0.2em]">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting || loading
                        ? "Validating..."
                        : "Send Reset Link"}
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setView("login");
                    setSubmitError(null);
                    setResetSent(false);
                  }}
                  className="w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors pt-2"
                >
                  Back to Login
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <a
              href="#/"
              className="text-[10px] font-black text-gray-300 hover:text-blue-600 transition-colors uppercase tracking-widest"
            >
              Exit Management
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
