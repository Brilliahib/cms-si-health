import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminSubModulesWrapper from "@/components/organisms/dashboard/admin/sub-modules/DashboardAdminSubModules";

export default function DashboardAdminSubModulesPage() {
  return (
    <section>
      <DashboardTitle
        head="Sub Materi"
        body="Menampilkan sub materi CAPD & HD"
      />
      <DashboardAdminSubModulesWrapper />
    </section>
  );
}
