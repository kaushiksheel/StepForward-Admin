"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/clerk-react";
import NavList from "../nav-list";
import { Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="container py-3 flex justify-between">
      <div className="flex items-center space-x-4">
        <Link href={"/dashboard"} className="text-xl font-medium">
          StepForwardStore
        </Link>
        <Menu className="lg:hidden w-5 h-5 cursor-pointer" />
        <div className="hidden lg:block">
          <NavList />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
