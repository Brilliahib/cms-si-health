"use client";

import { historyScreeningColumns } from "@/components/atoms/datacolumn/DataHistoryScreeningAdmin";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import { useGetHistoryScreeningByScreeningId } from "@/http/screening/get-history-screening-by-screening-id";
import { HistoryScreening } from "@/types/screening/screening";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

interface DashboardAdminReportHistoryScreeningWrapperProps {
  id: string;
}

export default function DashboardAdminReportHistoryScreeningWrapper({
  id,
}: DashboardAdminReportHistoryScreeningWrapperProps) {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const { data, isPending } = useGetHistoryScreeningByScreeningId(
    session?.access_token as string,
    id,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((item: HistoryScreening) =>
      item.user?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data?.data, search]);
  return (
    <div>
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyScreeningColumns}
        isLoading={isPending}
      />
    </div>
  );
}
