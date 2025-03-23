"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Search,
  Book,
  History,
  Info,
  BookOpen,
  ClipboardPen,
  User,
  ClipboardList,
} from "lucide-react";
import { NavUser } from "./NavUser";
import { useMemo } from "react";

interface AppSidebarProps {
  session: Session;
}

export function AppSidebar({ session }: AppSidebarProps) {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      ...(session?.user.role === "admin"
        ? [
            {
              icon: <LayoutDashboard />,
              name: "Dashboard Admin",
              href: "/dashboard/admin",
            },
            {
              icon: <BookOpen />,
              name: "Bank Soal",
              href: "/dashboard/admin/question-banks",
            },
            {
              icon: <Book />,
              name: "Materi",
              href: "/dashboard/admin/modules",
            },
            {
              icon: <ClipboardPen />,
              name: "Daftar Tes",
              href: "/dashboard/admin/tests",
            },
            {
              icon: <ClipboardList />,
              name: "Laporan Keseluruhan",
              href: "/dashboard/admin/reports",
            },
            {
              icon: <User />,
              name: "Pasien",
              href: "/dashboard/admin/users",
            },
          ]
        : [
            {
              icon: <LayoutDashboard />,
              name: "Dashboard",
              href: "/dashboard",
            },
            {
              icon: <Search />,
              name: "Screening",
              href: "/dashboard/screening",
            },
            {
              icon: <Book />,
              name: "Penjelasan Umum",
              href: "/dashboard/general",
            },
            { icon: <History />, name: "Riwayat", href: "/dashboard/history" },
            {
              icon: <Info />,
              name: "Panduan Screening",
              href: "/dashboard/guide",
            },
          ]),
    ],
    [session, pathname]
  );

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="h-14 cursor-default justify-center border-b bg-white dark:bg-slate-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="ml-2 flex items-center gap-x-3">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image
                  src="/images/logo/undip.png"
                  alt="Sistem Informasi Kesehatan Ginjal"
                  width={30}
                  height={30}
                />
                <h1 className="font-semibold tracking-tight">
                  SI-Kesehatan Ginjal
                </h1>
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="bg-white pb-20 dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                      pathname === item.href
                        ? "bg-primary/10 text-primary dark:bg-slate-800"
                        : ""
                    }`}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
