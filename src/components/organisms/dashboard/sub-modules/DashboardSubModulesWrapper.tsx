"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { useGetDetailSubModule } from "@/http/sub-modules/get-detail-sub-module";
import { useSession } from "next-auth/react";

interface DashboardSubModulesWrapper {
  id: string;
}

export default function DashboardSubModulesWrapper({
  id,
}: DashboardSubModulesWrapper) {
  const { data: session, status } = useSession();
  const { data } = useGetDetailSubModule(id, session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <div>
      <DashboardTitle
        head={data?.data.name ?? "Detail Sub Materi"}
        body={`Menampilkan detail sub materi dari ${data?.data.name ?? ""}`}
      />
    </div>
  );
}
