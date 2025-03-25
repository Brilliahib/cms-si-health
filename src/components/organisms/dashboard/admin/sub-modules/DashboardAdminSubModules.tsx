"use client";

import { capdColumns } from "@/components/atoms/datacolumn/DataCAPD";
import { hdColumns } from "@/components/atoms/datacolumn/DataHD";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllCAPD } from "@/http/sub-modules/get-all-capd";
import { useGetAllHD } from "@/http/sub-modules/get-all-hd";
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
  return (
    <div>
      <Tabs
        defaultValue="capd"
        className="space-y-4"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList className="grid w-full max-w-[300px] grid-cols-2">
          <TabsTrigger value="capd">CAPD</TabsTrigger>
          <TabsTrigger value="hd">HD</TabsTrigger>
        </TabsList>

        <TabsContent value="capd">
          <DataTable
            data={data?.data ?? []}
            columns={capdColumns}
            isLoading={isPending}
          />
        </TabsContent>
        <TabsContent value="hd">
          <DataTable
            data={post?.data ?? []}
            columns={hdColumns}
            isLoading={isLoad}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
