"use client";

import { postTestColumns } from "@/components/atoms/datacolumn/DataPostTest";
import { preTestColumns } from "@/components/atoms/datacolumn/DataPreTest";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllPostTest } from "@/http/test/get-all-post-test";
import { useGetAllPreTest } from "@/http/test/get-all-pre-test";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminTestWrapper() {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("pre-test");

  const isAuthenticated = status === "authenticated";

  const { data, isPending } = useGetAllPreTest(
    session?.access_token as string,
    {
      enabled: isAuthenticated && selectedTab === "pre-test",
    },
  );

  const { data: post, isPending: isLoad } = useGetAllPostTest(
    session?.access_token as string,
    {
      enabled: isAuthenticated && selectedTab === "post-test",
    },
  );

  return (
    <div>
      <Tabs
        defaultValue="pre-test"
        className="space-y-4"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList className="grid w-full max-w-[300px] grid-cols-2">
          <TabsTrigger value="pre-test">Pre Test</TabsTrigger>
          <TabsTrigger value="post-test">Post Test</TabsTrigger>
        </TabsList>

        <TabsContent value="pre-test">
          <DataTable
            data={data?.data ?? []}
            columns={preTestColumns}
            isLoading={isPending}
          />
        </TabsContent>
        <TabsContent value="post-test">
          <DataTable
            data={post?.data ?? []}
            columns={postTestColumns}
            isLoading={isLoad}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
