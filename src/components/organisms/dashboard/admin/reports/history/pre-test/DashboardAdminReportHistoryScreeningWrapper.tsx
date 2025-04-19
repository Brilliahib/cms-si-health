"use client";

import { historyPreTestColumns } from "@/components/atoms/datacolumn/DataHistoryPreTestAdmin";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import { useGetHistoryPreTestByPretestId } from "@/http/admin/history/pre-test/get-history-pre-test-by-pretest-id";
import { useGetDetailPreTest } from "@/http/test/get-detail-pre-test";
import { HistoryPreTest } from "@/types/test/pre-test";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

interface DashboardAdminReportHistoryPreTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportHistoryPreTestWrapper({
  id,
}: DashboardAdminReportHistoryPreTestWrapperProps) {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const { data, isPending } = useGetHistoryPreTestByPretestId(
    session?.access_token as string,
    id,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: preTest } = useGetDetailPreTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((item: HistoryPreTest) =>
      item.user?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data?.data, search]);
  return (
    <div>
      <DashboardTitleBold
        head={preTest?.data?.name ? `Laporan ${preTest.data.name}` : "Laporan"}
      />
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyPreTestColumns}
        isLoading={isPending}
      />
    </div>
  );
}
