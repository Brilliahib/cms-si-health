"use client";

import CardListHistoryQuestionScreening from "@/components/molecules/card/CardListHistoryQuestionScreening";
import CardPersonalInformationUserId from "@/components/molecules/card/CardPersonalInformationUserId";
import { useGetPersonalInformationByUserId } from "@/http/personal-information/get-personal-information-user-id";
import { useGetDetailHistoryScreeningDetail } from "@/http/screening/get-history-detail-screening";
import { useSession } from "next-auth/react";

interface DashboardAdminReportScreeningDetailWrapperProps {
  id: string;
}

export default function DashboardAdminReportScreeningDetailWrapper({
  id,
}: DashboardAdminReportScreeningDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryScreeningDetail(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: personal, isPending: personalIsPending } =
    useGetPersonalInformationByUserId(
      session?.access_token as string,
      data?.data?.user.id as string,
      {
        enabled: !!data?.data?.user.id,
      },
    );
  return (
    <div className="space-y-4">
      <CardPersonalInformationUserId
        data={personal?.data}
        isLoading={personalIsPending}
      />
      <CardListHistoryQuestionScreening
        data={data?.data}
        isLoading={isPending}
      />
    </div>
  );
}
