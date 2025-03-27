"use client";

import { usersColumns } from "@/components/atoms/datacolumn/DataUsers";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllUsers } from "@/http/users/get-all-users";
import { useSession } from "next-auth/react";

export default function DashboardAdminUsersWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllUsers(session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <div>
      <DataTable
        columns={usersColumns}
        data={data?.data ?? []}
        isLoading={isPending}
      />
    </div>
  );
}
