import type React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../components/Profile";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <span className="">Acme Inc</span>
          </NavLink>
        </div>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* <MobileNav /> */}
          <div className="w-full flex-1"></div>
          <Profile />
        </header>
        <main className="flex flex-1 flex-col gap-4 lg:gap-6">
          <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center lg:grid lg:grid-cols-1">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] sm:[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
            {children}
            {/* <Analytics /> */}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
