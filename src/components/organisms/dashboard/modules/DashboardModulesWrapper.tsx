"use client";

import CardListModule from "@/components/molecules/card/CardListModule";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { useSession } from "next-auth/react";

export default function DashboardModulesWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllModules(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-4">
      <CardListModule data={data?.data || []} isLoading={isPending} />
    </div>
  );
}
