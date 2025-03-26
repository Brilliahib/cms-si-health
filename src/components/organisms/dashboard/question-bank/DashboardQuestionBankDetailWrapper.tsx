"use client";

import { questionBankDetailColumns } from "@/components/atoms/datacolumn/DataQuestionBankDetail";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetDetailQuestionBank } from "@/http/question-banks/get-detail-question-bank";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardQuestionBankDetailWrapperProps {
  id: string;
}

export default function DashboardQuestionBankDetailWrapper({
  id,
}: DashboardQuestionBankDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailQuestionBank(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardTitle
          head={data?.data.name ?? ""}
          body="Menampilkan daftar pertanyaan dari bank soal"
        />
        <div>
          <Link href={`/dashboard/admin/question-banks/${id}/create`}>
            <Button>
              <Plus /> Tambah Soal
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        data={data?.data.questions ?? []}
        columns={questionBankDetailColumns}
        isLoading={isPending}
      />
    </div>
  );
}
