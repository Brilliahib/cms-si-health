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
  BookOpen,
  ClipboardPen,
  User,
  ClipboardList,
  NotebookText,
  SearchCheck,
  Settings2,
  Users,
} from "lucide-react";
import { NavUser } from "./NavUser";
import { useGetCheckPersonalInformation } from "@/http/personal-information/get-check-personal-information";

interface AppSidebarProps {
  session: Session;
}

export function AppSidebar({ session }: AppSidebarProps) {
  const pathname = usePathname();

  const buttonClass = (href: string) =>
    `hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
      pathname.startsWith(href)
        ? "bg-primary/10 text-primary dark:bg-slate-800"
        : ""
    }`;

  const shouldCheckInformation = session?.user.role !== "admin";

  const { data } = useGetCheckPersonalInformation(
    session.access_token as string,
    {
      enabled: shouldCheckInformation && !!session.access_token,
    },
  );

  const isCompleted =
    ["admin", "medical_personal"].includes(session?.user.role) ||
    (data?.data.is_completed ?? false);

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
                  Dialisis Connect
                </h1>
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                    pathname === "/dashboard"
                      ? "bg-primary/10 text-primary dark:bg-slate-800"
                      : ""
                  }`}
                >
                  <Link
                    href={
                      session?.user.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard"
                    }
                  >
                    <LayoutDashboard />
                    <span>
                      {session?.user.role === "admin"
                        ? "Dashboard Admin"
                        : "Dashboard"}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCompleted ? null : (
          <>
            {session?.user.role === "user" && (
              <>
                {/* Menu utama */}
                <SidebarGroup>
                  <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {session?.user.role === "user" && (
                        <>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              asChild
                              className={buttonClass("/dashboard/screening")}
                            >
                              <Link href="/dashboard/screening">
                                <Search />
                                <span>Screening</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              asChild
                              className={buttonClass("/dashboard/modules")}
                            >
                              <Link href="/dashboard/modules">
                                <NotebookText />
                                <span>Modul Materi</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </>
                      )}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}

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
                          className={buttonClass(
                            "/dashboard/admin/question-banks",
                          )}
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
                          className={buttonClass(
                            "/dashboard/admin/sub-modules",
                          )}
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
                          className={buttonClass("/dashboard/admin/screening")}
                        >
                          <Link href="/dashboard/admin/screening">
                            <SearchCheck />
                            <span>Screening</span>
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
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass(
                            "/dashboard/admin/discussions",
                          )}
                        >
                          <Link href="/dashboard/admin/discussions">
                            <Users />
                            <span>Forum Komunitas</span>
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

            {/* Medical personal groups */}
            {session?.user.role === "medical_personal" && (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Diskusi</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/discussions")}
                        >
                          <Link href="/dashboard/discussions">
                            <Users />
                            <span>Forum Komunitas</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}

            {/* Untuk role user */}
            {session?.user.role === "user" && (
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
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {session?.user.role === "user" && (
              <SidebarGroup>
                <SidebarGroupLabel>Diskusi</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={buttonClass("/dashboard/discussions")}
                      >
                        <Link href="/dashboard/discussions">
                          <Users />
                          <span>Forum Komunitas</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            <SidebarGroup>
              <SidebarGroupLabel>Pengaturan Akun</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                        pathname === "/dashboard/settings"
                          ? "bg-primary/10 text-primary dark:bg-slate-800"
                          : ""
                      }`}
                    >
                      <Link href="/dashboard/settings">
                        <Settings2 />
                        <span>Pengaturan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
