import Navbar from "@/components/ui/navbar";

import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>
      <main className="container mt-3">{children}</main>
    </div>
  );
}

export default Layout;