"use client";

import { screeningColumns } from "@/components/atoms/datacolumn/DataScreening";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllScreening } from "@/http/screening/get-all-screening";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardScreeningWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-4">
      <div>
        <Link href={"/dashboard/admin/screening/create"}>
          <Button>Tambah Screening</Button>
        </Link>
      </div>
      <DataTable
        columns={screeningColumns}
        data={data?.data ?? []}
        isLoading={isPending}
      />
    </div>
  );
}
