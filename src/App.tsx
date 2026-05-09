import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navbar, Footer } from "./components";

const LandingPage = lazy(() =>
  import("./pages/LandingPage").then((module) => ({
    default: module.LandingPage,
  })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((module) => ({
    default: module.AboutPage,
  })),
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  })),
);
const AdminLayout = lazy(() =>
  import("./admin/AdminLayout").then((module) => ({
    default: module.default,
  })),
);
const Login = lazy(() =>
  import("./admin/Login").then((module) => ({
    default: module.default,
  })),
);

function App() {
  const [route, setRoute] = useState<string>(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    // Scroll to top when route changes (except for section anchors)
    if (route.startsWith("#/") || route === "" || route === "#") {
      window.scrollTo(0, 0);
    }
  }, [route]);

  const handleBookAppointment = () => {
    window.location.hash = "consultation";
  };

  const handleContactClick = () => {
    console.log("Contact clicked from footer");
  };

  const renderPage = () => {
    if (route === "#/admin/login") {
      return <Login />;
    }
    if (route.startsWith("#/admin")) {
      return <AdminLayout route={route} />;
    }
    if (route === "#/about") {
      return <AboutPage />;
    }
    if (route === "#/contact") {
      return <ContactPage />;
    }
    // For other routes or no route, show landing page
    // The landing page handles section scrolling via hash
    return <LandingPage />;
  };

  return (
    <>
      {!route.startsWith("#/admin") && (
        <Navbar onCTAClick={handleBookAppointment} />
      )}
      <Suspense
        fallback={
          <main className="min-h-screen flex items-center justify-center bg-surface text-text-primary">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="h-3 w-3 rounded-full bg-primary animate-pulse" />
              Loading page...
            </div>
          </main>
        }
      >
        {renderPage()}
      </Suspense>
      {!route.startsWith("#/admin") && (
        <Footer onContactClick={handleContactClick} />
      )}
    </>
  );
}

export default App;
