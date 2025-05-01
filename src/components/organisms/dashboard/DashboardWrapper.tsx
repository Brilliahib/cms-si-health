"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardCAPDMaterialCount from "@/components/molecules/card/CardDashboardTitle";
import { History, MessageSquare, NotebookText, Search } from "lucide-react";

export default function DashboardWrapper() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role === "admin") {
    router.push("/dashboard/admin");
    return null;
  }

  if (session.user.role === "medical_personal") {
    router.push("/dashboard/medical");
    return null;
  }

  return (
    <>
      <DashboardTitle
        head="Beranda"
        body="Selamat datang di halaman beranda Dialisis Connect Edu"
      />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <CardCAPDMaterialCount
            title="Screening"
            icon={Search}
            link="screening"
          />
          <CardCAPDMaterialCount
            title="Modul Materi"
            icon={NotebookText}
            link="modules"
          />
          <CardCAPDMaterialCount
            title="Riwayat Pengerjaan"
            link="history"
            icon={History}
          />
          <CardCAPDMaterialCount
            title="Forum Komunitas"
            link="discussions"
            icon={MessageSquare}
          />
        </div>
      </div>
    </>
  );
}
