"use client";

import { historyPostTestColumns } from "@/components/atoms/datacolumn/DataHistoryPostTestAdmin";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import { useGetHistoryPostTestByPostTestId } from "@/http/admin/history/post-test/get-history-post-test-by-posttest-id";
import { useGetDetailPostTest } from "@/http/test/get-detail-post-test";
import { HistoryPostTest } from "@/types/test/post-test";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

interface DashboardAdminReportHistoryPostTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportHistoryPostTestWrapper({
  id,
}: DashboardAdminReportHistoryPostTestWrapperProps) {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const { data, isPending } = useGetHistoryPostTestByPostTestId(
    session?.access_token as string,
    id,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: postTest } = useGetDetailPostTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((item: HistoryPostTest) =>
      item.user?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data?.data, search]);
  return (
    <div>
      <DashboardTitleBold
        head={
          postTest?.data?.name ? `Laporan ${postTest.data.name}` : "Laporan"
        }
      />
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyPostTestColumns}
        isLoading={isPending}
      />
    </div>
  );
}
