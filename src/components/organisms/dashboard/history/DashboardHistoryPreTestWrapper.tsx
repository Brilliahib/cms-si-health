"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllHistoryPreTest } from "@/http/test/get-history-pre-test";
import { ClipboardPenLine } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardHistoryPreTestWrapper() {
  const { data: session, status } = useSession();
  const { data } = useGetAllHistoryPreTest(session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <div>
      <div className="space-y-4">
        {data?.data.map((preTestHistory) => (
          <Link
            href={`/dashboard/history/pre-test/${preTestHistory.id}`}
            key={preTestHistory.id}
            className="group block"
          >
            <div className="flex flex-row gap-6">
              <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
                <ClipboardPenLine className="text-background m-auto h-12 w-12" />
              </div>
              <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-secondary uppercase">Pre Test</Badge>
                    <CardTitle className="text-md font-bold md:text-xl">
                      {preTestHistory.pre_test.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
                      Nilai Skor: {preTestHistory.sum_score}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
