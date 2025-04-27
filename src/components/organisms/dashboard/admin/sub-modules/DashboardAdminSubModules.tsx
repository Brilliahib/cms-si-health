"use client";

import { subModuleColumns } from "@/components/atoms/datacolumn/DataSubModule";
import DialogCreateSubModules from "@/components/atoms/dialog/DialogCreateSubModule";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllSubModulesNoCategory } from "@/http/sub-modules/get-all-sub-modules-no-category";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminSubModulesWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllSubModulesNoCategory(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [isDialogSubModuleOpen, setIsDialogSubModuleOpen] = useState(false);

  const handleDialogSubModuleOpen = () => {
    setIsDialogSubModuleOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <Button onClick={handleDialogSubModuleOpen}>
          <Plus /> Tambah Materi
        </Button>
        <DataTable
          columns={subModuleColumns}
          data={data?.data ?? []}
          isLoading={isPending}
        />
      </div>
      <DialogCreateSubModules
        open={isDialogSubModuleOpen}
        setOpen={setIsDialogSubModuleOpen}
      />
    </>
  );
}
