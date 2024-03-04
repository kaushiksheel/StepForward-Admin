import { navItems } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

function NavList() {
  const pathname = usePathname();
  const { storeId } = useParams();
  const isMatched = (selectedLink: string) => {
    return selectedLink === `${pathname}`;
  };

  return (
    <ul className="flex items-center space-x-3">
      {navItems.map(({ id, link, title }) => (
        <li key={id}>
          <Link
            href={`/${storeId}${link}`}
            className={cn(
              "text-sm ",
              isMatched(`/${storeId}${link}`)
                ? "text-primary font-medium"
                : "text-gray-500 font-normal"
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
