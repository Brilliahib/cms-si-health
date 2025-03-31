"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListPostTest from "@/components/molecules/card/CardListPostTest";
import CardListPreTest from "@/components/molecules/card/CardListPreTest";
import CardListSubModule from "@/components/molecules/card/CardListSubModule";
import { useGetDetailModules } from "@/http/modulels/get-detail-modules";
import { useSession } from "next-auth/react";

interface DashboardModulesDetailWrapperProps {
  id: string;
}

export default function DashboardModulesDetailWrapper({
  id,
}: DashboardModulesDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailModules(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <>
      <DashboardTitle
        head={data?.data.module.name ?? "Modules"}
        body={`Menampilkan detail module ${data?.data.module.name ?? ""}`}
      />
      <div className="space-y-4">
        <CardListPreTest data={data?.data} isLoading={isPending} />
        <CardListSubModule data={data?.data} isLoading={isPending} />
        <CardListPostTest data={data?.data} isLoading={isPending} />
      </div>
    </>
  );
}
