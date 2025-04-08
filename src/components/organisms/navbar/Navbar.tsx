"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import NavButton from "@/components/atoms/nav/NavButton";
import NavL from "@/components/atoms/nav/NavL";
import NavLink from "@/components/atoms/nav/NavLink";
import Link from "next/link";

export interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        href: "#",
        label: "Tentang Kami",
        active: pathname.startsWith("/woman"),
      },
      {
        href: "#",
        label: "Materi",
        active: pathname.startsWith("/man"),
      },
      {
        href: "#",
        label: "Screening",
        active: pathname.startsWith("/kids"),
      },
    ],
    [pathname],
  );

  return (
    <>
      <div className="bg-background sticky top-0 z-50 mb-0 w-full">
        <div className="pad-x-xl bg-background flex justify-between gap-8 py-3 md:gap-12">
          <NavL />
          <nav className="pad-x hidden items-center space-x-8 py-3 font-semibold md:flex">
            {links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
          <NavButton links={links} />
        </div>
      </div>
    </>
  );
}
