"use client";

import { questionBankColumns } from "@/components/atoms/datacolumn/DataQuestionBank";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllQuestionBanks } from "@/http/question-banks/get-all-question-bank";
import { useSession } from "next-auth/react";

export default function DashboardQuestionBankWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllQuestionBanks(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );
  return (
    <div>
      <DataTable data={data?.data ?? []} columns={questionBankColumns} />
    </div>
  );
}
