"use client";

import { historyPostTestColumns } from "@/components/atoms/datacolumn/DataHistoryPostTestAdmin";
import { historyPreTestColumns } from "@/components/atoms/datacolumn/DataHistoryPreTestAdmin";
import { historyScreeningColumns } from "@/components/atoms/datacolumn/DataHistoryScreeningAdmin";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllHistoryPostTestAdmin } from "@/http/admin/history/post-test/get-all-history-post-test-admin";
import { useGetAllHistoryPreTestAdmin } from "@/http/admin/history/pre-test/get-all-history-pre-test-admin";
import { useGetAllHistoryScreeningAdmin } from "@/http/admin/history/screening/get-all-history-screening-admin";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminReportWrapper() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("screening");
  const { data, isPending } = useGetAllHistoryScreeningAdmin(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && activeTab === "screening",
    },
  );

  const { data: preTest, isPending: preTestIsPending } =
    useGetAllHistoryPreTestAdmin(session?.access_token as string, {
      enabled: status === "authenticated" && activeTab === "pre-test",
    });

  const { data: postTest, isPending: postTestIsPending } =
    useGetAllHistoryPostTestAdmin(session?.access_token as string, {
      enabled: status === "authenticated" && activeTab === "post-test",
    });
  return (
    <div>
      <Tabs
        defaultValue="screening"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4 grid w-full max-w-sm grid-cols-3">
          <TabsTrigger value="screening">Screening</TabsTrigger>
          <TabsTrigger value="pre-test">Pre Test</TabsTrigger>
          <TabsTrigger value="post-test">Post Test</TabsTrigger>
        </TabsList>
        <TabsContent value="screening">
          <DataTable
            data={data?.data ?? []}
            columns={historyScreeningColumns}
            isLoading={isPending}
          />
        </TabsContent>
        <TabsContent value="pre-test">
          <DataTable
            data={preTest?.data ?? []}
            columns={historyPreTestColumns}
            isLoading={preTestIsPending}
          />
        </TabsContent>
        <TabsContent value="post-test">
          <DataTable
            data={postTest?.data ?? []}
            columns={historyPostTestColumns}
            isLoading={postTestIsPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
