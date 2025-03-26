"use client";

import { capdColumns } from "@/components/atoms/datacolumn/DataCAPD";
import { hdColumns } from "@/components/atoms/datacolumn/DataHD";
import DialogCreateCAPD from "@/components/atoms/dialog/DialogCreateSubModuleCAPD";
import DialogCreateHD from "@/components/atoms/dialog/DialogCreateSubModuleHD";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllCAPD } from "@/http/sub-modules/get-all-capd";
import { useGetAllHD } from "@/http/sub-modules/get-all-hd";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminSubModulesWrapper() {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("capd");

  const isAuthenticated = status === "authenticated";

  const { data, isPending } = useGetAllCAPD(session?.access_token as string, {
    enabled: isAuthenticated && selectedTab === "capd",
  });

  const { data: post, isPending: isLoad } = useGetAllHD(
    session?.access_token as string,
    {
      enabled: isAuthenticated && selectedTab === "hd",
    },
  );

  const [dialogCreateCAPDOpen, setDialogCreateCAPDOpen] = useState(false);
  const [dialogCreateHDOpen, setDialogCreateHDOpen] = useState(false);

  const handleCAPDDialogOpen = () => {
    setDialogCreateCAPDOpen(true);
  };

  const handleHDDialogOpen = () => {
    setDialogCreateHDOpen(true);
  };

  return (
    <>
      <div>
        <Tabs
          defaultValue="capd"
          className="space-y-2"
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList className="grid w-full max-w-[250px] grid-cols-2">
            <TabsTrigger value="capd">CAPD</TabsTrigger>
            <TabsTrigger value="hd">HD</TabsTrigger>
          </TabsList>
          <TabsContent value="capd">
            <div className="mb-4">
              <Button onClick={handleCAPDDialogOpen}>
                <Plus />
                Tambah Sub Materi CAPD
              </Button>
            </div>
            <DataTable
              data={data?.data ?? []}
              columns={capdColumns}
              isLoading={isPending}
            />
          </TabsContent>
          <TabsContent value="hd">
            <div className="mb-4">
              <Button onClick={handleHDDialogOpen}>
                <Plus />
                Tambah Sub Materi HD
              </Button>
            </div>
            <DataTable
              data={post?.data ?? []}
              columns={hdColumns}
              isLoading={isLoad}
            />
          </TabsContent>
        </Tabs>
      </div>
      <DialogCreateCAPD
        open={dialogCreateCAPDOpen}
        setOpen={setDialogCreateCAPDOpen}
      />
      <DialogCreateHD
        open={dialogCreateHDOpen}
        setOpen={setDialogCreateHDOpen}
      />
    </>
  );
}
