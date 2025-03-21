import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/organisms/sidebar/app-sidebar";
import BreadcrumbNav from "@/components/atoms/breadcrumb/Breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar session={session!} />
      <SidebarInset>
        <BreadcrumbNav />
        <div className="px-5 py-20">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
