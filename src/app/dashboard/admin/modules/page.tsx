import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminModulesWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminModules";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardAdminModulesPage() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <DashboardTitle head="Materi" body="Menampilkan semua daftar materi" />
        <div>
          <Link href={`/dashboard/admin/modules/create`}>
            <Button>
              <Plus />
              Tambah Materi
            </Button>
          </Link>
        </div>
      </div>
      <DashboardAdminModulesWrapper />
    </section>
  );
}
