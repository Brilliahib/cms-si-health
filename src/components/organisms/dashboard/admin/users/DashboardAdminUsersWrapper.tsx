"use client";

import AlertDialogResetPasswordUserDialog from "@/components/atoms/alert/AlertDialogResetPasswordUser";
import { usersColumns } from "@/components/atoms/datacolumn/DataUsers";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { SearchUserInput } from "@/components/molecules/search/SearchUsers";
import { RoleFilterSelect } from "@/components/molecules/select/RoleFilterSelect";
import { useAddResetPasswordUsers } from "@/http/admin/users/reset-password-users";
import { useGetAllUsers } from "@/http/users/get-all-users";
import { User } from "@/types/user/user";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminUsersWrapper() {
  const { data: session, status } = useSession();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const { data, isPending } = useGetAllUsers(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resetPasswordUserHandler = (data: User) => {
    setSelectedUser(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: resetPassword, isPending: isDeletePending } =
    useAddResetPasswordUsers({
      onError: () => {
        toast.error("Gagal melakukan reset password pengguna!");
      },
      onSuccess: () => {
        setSelectedUser(null);
        toast.success("Berhasil melakukan reset password pengguna!");
        queryClient.invalidateQueries({
          queryKey: ["users-list"],
        });
      },
    });

  const handleResetPasswordUser = () => {
    if (selectedUser?.id) {
      resetPassword({
        id: selectedUser.id,
      });
    }
  };

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
        columns={usersColumns({
          resetPasswordUserHandler: resetPasswordUserHandler,
        })}
        data={filteredData}
        isLoading={isPending}
      />

      <AlertDialogResetPasswordUserDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleResetPasswordUser}
        isPending={isDeletePending}
      />
    </div>
  );
}
