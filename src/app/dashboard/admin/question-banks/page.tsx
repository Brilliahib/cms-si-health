import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardQuestionBankWrapper from "@/components/organisms/dashboard/question-bank/DashboardQuestionBankWrapper";

export default function DashboardAdminQuestionBankPage() {
  return (
    <section>
      <DashboardTitle head="Bank Soal" body="Menampilkan daftar bank soal" />
      <DashboardQuestionBankWrapper />
    </section>
  );
}
