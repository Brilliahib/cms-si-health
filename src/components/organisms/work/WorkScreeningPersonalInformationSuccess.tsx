import BreadcrumbPersonalInformation from "@/components/atoms/breadcrumb/BreadcrumbPersonalInformation";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import CardPersonalInformationSuccess from "@/components/molecules/card/CardPersonalInformationSuccess";

interface WorkScreeningPersonalInformationSuccessProps {
  id: string;
}

export default function WorkScreeningPersonalInformationSuccess({
  id,
}: WorkScreeningPersonalInformationSuccessProps) {
  return (
    <div>
      <BreadcrumbPersonalInformation />
      <div className="p-6 pt-20">
        <DashboardTitleBold head="Pengisian Informasi Pribadi" />
        <CardPersonalInformationSuccess id={id} />
      </div>
    </div>
  );
}
