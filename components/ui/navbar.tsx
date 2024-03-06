"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/clerk-react";
import NavList from "../nav-list";
import { Menu } from "lucide-react";
import { Dropdown } from "./dropdown";
import { Store } from "@prisma/client";
import { MobileNav } from "../mobile-nav";

function Navbar({ stores }: { stores: Store[] }) {
  const options = stores?.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  return (
    <nav className="container py-3 flex justify-between">
      <div className="flex items-center space-x-4">
        <Link href={"/"} className="text-xl font-medium">
          StepForwardStore
        </Link>
        <div className=" hidden lg:block">
          <Dropdown options={options} placeholder="Search stores" />
        </div>
        <MobileNav options={options}>
          <Menu className="lg:hidden w-5 h-5 cursor-pointer" />
        </MobileNav>
        <ul className="hidden lg:flex items-center space-x-3 ">
          <NavList />
        </ul>
      </div>
      <div className="flex items-center space-x-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}

export default Navbar;
