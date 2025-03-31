"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ModulesDetail } from "@/types/modules/modules-detail";
import { ClipboardPen } from "lucide-react";
import Link from "next/link";

interface CardListPreTestProps {
  data?: ModulesDetail;
  isLoading?: boolean;
}

function PreTestSkeleton() {
  return (
    <div className="flex flex-row gap-6">
      <div className="bg-primary/10 relative hidden aspect-video h-36 w-36 rounded-lg md:flex" />
      <Card className="border-primary/10 w-full border-2 shadow-transparent">
        <CardHeader className="flex md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-6 w-52 rounded-md" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function CardListPreTest({
  data,
  isLoading,
}: CardListPreTestProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <PreTestSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.pre_test.map((preTest) => (
        <Link
          key={preTest.id}
          href={`/work/pre-test/${preTest.id}`}
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
  );
}
