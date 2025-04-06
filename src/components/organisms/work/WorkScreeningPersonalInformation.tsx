import BreadcrumbPersonalInformation from "@/components/atoms/breadcrumb/BreadcrumbPersonalInformation";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import CardPersonalInformation from "@/components/molecules/card/CardPersonalInformation";

interface WorkScreeningPersonalInformationProps {
  id: string;
}

export default function WorkScreeningPersonalInformation({
  id,
}: WorkScreeningPersonalInformationProps) {
  return (
    <div>
      <BreadcrumbPersonalInformation />
      <div className="p-6 pt-20">
        <DashboardTitleBold head="Pengisian Informasi Pribadi" />
        <CardPersonalInformation id={id} />
      </div>
    </div>
  );
}
