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
  NotebookText,
} from "lucide-react";
import { NavUser } from "./NavUser";

interface AppSidebarProps {
  session: Session;
}

export function AppSidebar({ session }: AppSidebarProps) {
  const pathname = usePathname();

  const buttonClass = (href: string) =>
    `hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
      pathname === href ? "bg-primary/10 text-primary dark:bg-slate-800" : ""
    }`;

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

      <SidebarContent className="bg-white dark:bg-slate-950">
        {/* Menu utama */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {session?.user.role === "admin" ? (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                      pathname === "/dashboard/admin"
                        ? "bg-primary/10 text-primary dark:bg-slate-800"
                        : ""
                    }`}
                  >
                    <Link href="/dashboard/admin">
                      <LayoutDashboard />
                      <span>Dashboard Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                        pathname === "/dashboard"
                          ? "bg-primary/10 text-primary dark:bg-slate-800"
                          : ""
                      }`}
                    >
                      <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                        pathname === "/dashboard/screening"
                          ? "bg-primary/10 text-primary dark:bg-slate-800"
                          : ""
                      }`}
                    >
                      <Link href="/dashboard/screening">
                        <Search />
                        <span>Screening</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin-only groups */}
        {session?.user.role === "admin" && (
          <>
            {/* Konten */}
            <SidebarGroup>
              <SidebarGroupLabel>Manajemen Konten</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={buttonClass("/dashboard/admin/question-banks")}
                    >
                      <Link href="/dashboard/admin/question-banks">
                        <BookOpen />
                        <span>Bank Soal</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={buttonClass("/dashboard/admin/modules")}
                    >
                      <Link href="/dashboard/admin/modules">
                        <Book />
                        <span>Materi</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={buttonClass("/dashboard/admin/sub-modules")}
                    >
                      <Link href="/dashboard/admin/sub-modules">
                        <NotebookText />
                        <span>Sub Materi</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={buttonClass("/dashboard/admin/tests")}
                    >
                      <Link href="/dashboard/admin/tests">
                        <ClipboardPen />
                        <span>Pre & Post Test</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Laporan */}
            <SidebarGroup>
              <SidebarGroupLabel>Laporan</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={buttonClass("/dashboard/admin/reports")}
                    >
                      <Link href="/dashboard/admin/reports">
                        <ClipboardList />
                        <span>Laporan Keseluruhan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Pengguna */}
            <SidebarGroup>
              <SidebarGroupLabel>Manajemen Pengguna</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={buttonClass("/dashboard/admin/users")}
                    >
                      <Link href="/dashboard/admin/users">
                        <User />
                        <span>Pasien</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Untuk role selain admin */}
        {session?.user.role !== "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Informasi</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={buttonClass("/dashboard/general")}
                  >
                    <Link href="/dashboard/general">
                      <Book />
                      <span>Penjelasan Umum</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={buttonClass("/dashboard/history")}
                  >
                    <Link href="/dashboard/history">
                      <History />
                      <span>Riwayat</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={buttonClass("/dashboard/guide")}
                  >
                    <Link href="/dashboard/guide">
                      <Info />
                      <span>Panduan Screening</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
