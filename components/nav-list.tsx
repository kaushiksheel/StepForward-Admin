import { navItems } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavList() {
  const pathname = usePathname();
  const isMatched = (selectedLink: string) => {
    return selectedLink === pathname;
  };
  return (
    <ul className="flex items-center space-x-3">
      {navItems.map(({ id, link, title }) => (
        <li key={id}>
          <Link
            href={link}
            className={cn(
              "text-sm font-medium",
              isMatched(link) ? "text-primary" : "text-gray-500"
            )}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavList;
