"use client";

import { usersColumns } from "@/components/atoms/datacolumn/DataUsers";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { SearchUserInput } from "@/components/molecules/search/SearchUsers";
import { RoleFilterSelect } from "@/components/molecules/select/RoleFilterSelect";
import { useGetAllUsers } from "@/http/users/get-all-users";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

export default function DashboardAdminUsersWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllUsers(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data
      .filter((user) =>
        roleFilter === "all" ? true : user.role === roleFilter,
      )
      .filter((user) => {
        const keyword = searchQuery.toLowerCase();
        return (
          user.name?.toLowerCase().includes(keyword) ||
          user.email?.toLowerCase().includes(keyword)
        );
      });
  }, [data?.data, roleFilter, searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchUserInput value={searchQuery} onChange={setSearchQuery} />
        <RoleFilterSelect value={roleFilter} onChange={setRoleFilter} />
      </div>
      <DataTable
        columns={usersColumns}
        data={filteredData}
        isLoading={isPending}
      />
    </div>
  );
}
