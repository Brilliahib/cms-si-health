"use client";

import CardDetailNameOnTest from "@/components/molecules/card/CardDetailNameOnTest";
import CardListHistoryQuestionAdmin from "@/components/molecules/card/CardListHistoryQuestionAdmin";
import CardScoreHistoryPostTest from "@/components/molecules/card/CardScoreHistoryPostTest";
import { useGetDetailHistoryPostTest } from "@/http/history/post-test/get-detail-history-post-test";
import { useSession } from "next-auth/react";

interface DashboardAdminReportDetailPostTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportDetailPostTestWrapper({
  id,
}: DashboardAdminReportDetailPostTestWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryPostTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-4">
      <CardDetailNameOnTest name={data?.data.user.name ?? ""} />
      <CardScoreHistoryPostTest data={data?.data} isLoading={isPending} />
      <CardListHistoryQuestionAdmin data={data?.data} isLoading={isPending} />
    </div>
  );
}
