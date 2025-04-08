import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardDiscussionWrapper from "@/components/organisms/dashboard/discussions/DashboardDiscussionWrapper";

export default function DashboardDiscussionPage() {
  return (
    <section>
      <DashboardTitle
        head="Forum Komunitas"
        body="Menampilkan topik diskusi di forum komunitas"
      />
      <DashboardDiscussionWrapper />
    </section>
  );
}
