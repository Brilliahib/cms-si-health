"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDetailModules } from "@/http/modulels/get-detail-modules";
import { Book, ClipboardPen } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardModulesDetailWrapperProps {
  id: string;
}

export default function DashboardModulesDetailWrapper({
  id,
}: DashboardModulesDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data } = useGetDetailModules(id, session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <>
      <DashboardTitle
        head={data?.data.module.name ?? "Modules"}
        body={`Menampilkan detail module ${data?.data.module.name ?? ""}`}
      />
      <div className="space-y-4">
        <div>
          {data?.data.pre_test.map((preTest) => (
            <Link
              href={`/dashboard/modules/${preTest.id}`}
              key={preTest.id}
              className="group block"
            >
              <div className="flex flex-row gap-6">
                <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
                  <ClipboardPen className="text-background m-auto h-12 w-12" />
                </div>
                <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                  <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <Badge className="bg-secondary/20 text-secondary font-semibold uppercase">
                        Pre Test
                      </Badge>
                      <CardTitle className="text-md font-bold md:text-xl">
                        {preTest.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Link>
          ))}
        </div>
        <div>
          {data?.data.sub_modules.map((subModules) => (
            <Link
              href={`/dashboard/modules/${subModules.id}`}
              key={subModules.id}
              className="group block"
            >
              <div className="flex flex-row gap-6">
                <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
                  <Book className="text-background m-auto h-12 w-12" />
                </div>
                <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                  <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <Badge className="bg-secondary/20 text-secondary font-semibold uppercase">
                        Materi
                      </Badge>
                      <CardTitle className="text-md font-bold md:text-xl">
                        {subModules.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Link>
          ))}
        </div>
        <div>
          {data?.data.post_test.map((postTest) => (
            <Link
              href={`/dashboard/modules/${postTest.id}`}
              key={postTest.id}
              className="group block"
            >
              <div className="flex flex-row gap-6">
                <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
                  <ClipboardPen className="text-background m-auto h-12 w-12" />
                </div>
                <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                  <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <Badge className="bg-secondary/20 text-secondary font-semibold uppercase">
                        Post Test
                      </Badge>
                      <CardTitle className="text-md font-bold md:text-xl">
                        {postTest.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
