"use client";

import CardDetailNameOnTest from "@/components/molecules/card/CardDetailNameOnTest";
import CardListHistoryQuestion from "@/components/molecules/card/CardListHistoryQuestion";
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
      <CardListHistoryQuestion data={data?.data} isLoading={isPending} />
    </div>
  );
}
