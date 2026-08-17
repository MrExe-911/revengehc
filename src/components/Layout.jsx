import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import BackgroundLayer from "@/components/BackgroundLayer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundLayer />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}