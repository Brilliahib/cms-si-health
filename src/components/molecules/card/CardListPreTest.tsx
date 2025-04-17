"use client";

import DialogStartPreTest from "@/components/atoms/dialog/DialogStartPreTest";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PreTest } from "@/types/test/pre-test";
import { ClipboardPen } from "lucide-react";
import { useState } from "react";

interface CardListPreTestProps {
  data?: PreTest[];
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
  const [dialogStartPreTestOpen, setDialogStartPreTestOpen] = useState(false);
  const [selectedPreTestId, setSelectedPreTestId] = useState<string | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <PreTestSkeleton key={i} />
        ))}
      </div>
    );
  }

  const handleDialogStartPretestOpen = (id: string) => {
    setSelectedPreTestId(id);
    setDialogStartPreTestOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {data?.map((preTest) => (
          <div
            key={preTest.id}
            className="group block cursor-pointer"
            onClick={() => handleDialogStartPretestOpen(preTest.id)}
          >
            <div className="flex flex-row gap-6">
              <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
                <ClipboardPen className="text-background m-auto h-12 w-12" />
              </div>
              <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-secondary/20 text-secondary font-semibold">
                      Pre Test
                    </Badge>
                    <CardTitle className="text-md font-bold md:text-xl">
                      {preTest.name}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        ))}
        {selectedPreTestId && (
          <DialogStartPreTest
            open={dialogStartPreTestOpen}
            setOpen={setDialogStartPreTestOpen}
            id={selectedPreTestId}
          />
        )}
      </div>
    </>
  );
}
