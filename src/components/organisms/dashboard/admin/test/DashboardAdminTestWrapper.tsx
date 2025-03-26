"use client";

import { postTestColumns } from "@/components/atoms/datacolumn/DataPostTest";
import { preTestColumns } from "@/components/atoms/datacolumn/DataPreTest";
import DialogCreatePostTest from "@/components/atoms/dialog/DialogCreatePostTest";
import DialogCreatePreTest from "@/components/atoms/dialog/DialogCreatePreTest";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllPostTest } from "@/http/test/get-all-post-test";
import { useGetAllPreTest } from "@/http/test/get-all-pre-test";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminTestWrapper() {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("pre-test");
  const [dialogCreatePreTestOpen, setDialogCreatePreTestOpen] = useState(false);
  const [dialogCreatePostTestOpen, setDialogCreatePostTestOpen] =
    useState(false);
  const isAuthenticated = status === "authenticated";

  const handleDialogCreatePreTestOpen = () => {
    setDialogCreatePreTestOpen(true);
  };

  const handleDialogCreatePostTestOpen = () => {
    setDialogCreatePostTestOpen(true);
  };

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
    <>
      <div>
        <Tabs
          defaultValue="pre-test"
          className="space-y-2"
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList className="grid w-full max-w-[300px] grid-cols-2">
            <TabsTrigger value="pre-test">Pre Test</TabsTrigger>
            <TabsTrigger value="post-test">Post Test</TabsTrigger>
          </TabsList>

          <TabsContent value="pre-test">
            <div className="mb-4">
              <Button onClick={handleDialogCreatePreTestOpen}>
                <Plus /> Tambah Pre Test
              </Button>
            </div>
            <DataTable
              data={data?.data ?? []}
              columns={preTestColumns}
              isLoading={isPending}
            />
          </TabsContent>
          <TabsContent value="post-test">
            <div className="mb-4">
              <Button onClick={handleDialogCreatePostTestOpen}>
                <Plus /> Tambah Post Test
              </Button>
            </div>
            <DataTable
              data={post?.data ?? []}
              columns={postTestColumns}
              isLoading={isLoad}
            />
          </TabsContent>
        </Tabs>
      </div>
      <DialogCreatePreTest
        open={dialogCreatePreTestOpen}
        setOpen={setDialogCreatePreTestOpen}
      />
      <DialogCreatePostTest
        open={dialogCreatePostTestOpen}
        setOpen={setDialogCreatePostTestOpen}
      />
    </>
  );
}
