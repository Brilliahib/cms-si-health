import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminModulesWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminModules";

export default function DashboardAdminModulesPage() {
  return (
    <section>
      <DashboardTitle head="Materi" body="Menampilkan semua daftar materi" />
      <DashboardAdminModulesWrapper />
    </section>
  );
}
