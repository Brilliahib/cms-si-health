"use client";

import CardDetailNameOnTest from "@/components/molecules/card/CardDetailNameOnTest";
import CardListHistoryQuestionAdmin from "@/components/molecules/card/CardListHistoryQuestionAdmin";
import CardScoreHistoryPreTest from "@/components/molecules/card/CardScoreHistoryPreTest";
import { useGetDetailHistoryPreTest } from "@/http/history/pre-test/get-detail-pre-test";
import { useSession } from "next-auth/react";

interface DashboardAdminReportDetailPreTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportDetailPreTestWrapper({
  id,
}: DashboardAdminReportDetailPreTestWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryPreTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-4">
      <CardDetailNameOnTest name={data?.data.user.name ?? ""} />
      <CardScoreHistoryPreTest data={data?.data} isLoading={isPending} />
      <CardListHistoryQuestionAdmin data={data?.data} isLoading={isPending} />
    </div>
  );
}
