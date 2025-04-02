"use client";

import { useState } from "react";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListModuleContent from "@/components/molecules/card/CardListModuleContent";
import CardListPreTest from "@/components/molecules/card/CardListPreTest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDetailSubModule } from "@/http/sub-modules/get-detail-sub-module";
import { useGetAllPreTestBySubModule } from "@/http/test/get-pre-test-by-submodule";
import { useSession } from "next-auth/react";
import { useGetAllPostTestBySubModule } from "@/http/test/get-post-test-by-submodule";
import CardListPostTest from "@/components/molecules/card/CardListPostTest";

interface DashboardSubModulesWrapper {
  id: string;
}

export default function DashboardSubModulesWrapper({
  id,
}: DashboardSubModulesWrapper) {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("module-contents");

  const { data, isPending } = useGetDetailSubModule(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && activeTab !== "pre-test",
    },
  );

  const { data: preTest, isPending: preTestIsPending } =
    useGetAllPreTestBySubModule(id, session?.access_token as string, {
      enabled: status === "authenticated" && activeTab === "pre-test",
    });

  const { data: postTest, isPending: postTestIsPending } =
    useGetAllPostTestBySubModule(id, session?.access_token as string, {
      enabled: status === "authenticated" && activeTab === "post-test",
    });

  return (
    <div>
      <DashboardTitle
        head={data?.data.name ?? "Detail Sub Materi"}
        body={`Menampilkan detail sub materi dari ${data?.data.name ?? ""}`}
      />
      <Tabs
        defaultValue="module-contents"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 grid w-full max-w-sm grid-cols-3">
          <TabsTrigger value="pre-test">Pre Test</TabsTrigger>
          <TabsTrigger value="module-contents">Booklet Materi</TabsTrigger>
          <TabsTrigger value="post-test">Post Test</TabsTrigger>
        </TabsList>
        <TabsContent value="pre-test">
          <CardListPreTest
            data={preTest?.data || []}
            isLoading={preTestIsPending}
          />
        </TabsContent>
        <TabsContent value="module-contents">
          <CardListModuleContent
            data={data?.data.module_contents}
            isLoading={isPending}
          />
        </TabsContent>
        <TabsContent value="post-test">
          <CardListPostTest
            data={postTest?.data || []}
            isLoading={postTestIsPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
