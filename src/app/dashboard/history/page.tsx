import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryPreTestWrapper from "@/components/organisms/dashboard/history/DashboardHistoryPreTestWrapper";

export default function HistoryPage() {
  return (
    <section>
      <DashboardTitle
        head="Riwayat"
        body="Menampilkan riwayat screening, pre test dan post test"
      />
      <DashboardHistoryPreTestWrapper />
    </section>
  );
}
