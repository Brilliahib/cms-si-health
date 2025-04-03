"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PostTest } from "@/types/test/post-test";
import { ClipboardPen, FileX2 } from "lucide-react";
import Link from "next/link";

interface CardListPostTestProps {
  data?: PostTest[];
  isLoading?: boolean;
}

function PostTestSkeleton() {
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

export default function CardListPostTest({
  data,
  isLoading,
}: CardListPostTestProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <PostTestSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
        <FileX2 className="text-muted-foreground h-16 w-16" />
        <p className="text-muted-foreground">Data belum ada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.map((postTest) => (
        <Link
          href={`/work/post-test/${postTest.id}`}
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
                  <Badge className="bg-secondary/20 text-secondary font-semibold">
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
  );
}
