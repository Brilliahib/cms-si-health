import DialogStartScreening from "@/components/atoms/dialog/DialogStartScreening";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Screening } from "@/types/screening/screening";
import { FileSearch, FileX2 } from "lucide-react";
import { useState } from "react";

interface CardListScreeningProps {
  data: Screening[];
  isLoading: boolean;
}

export default function CardListScreening({
  data,
  isLoading,
}: CardListScreeningProps) {
  const [dialogStartScreeningOpen, setDialogStartScreeningOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div className="flex flex-row gap-6" key={i}>
            <Skeleton className="hidden aspect-video h-36 w-36 rounded-lg md:flex" />
            <Card className="border-muted w-full border-2 shadow-transparent">
              <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24 rounded" />
                  <Skeleton className="h-6 w-64 rounded" />
                  <Skeleton className="h-4 w-40 rounded" />
                </div>
              </CardHeader>
            </Card>
          </div>
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

  const handleDialogStartPretestOpen = () => {
    setDialogStartScreeningOpen(true);
  };
  return (
    <div>
      {data?.map((screening) => (
        <div
          onClick={handleDialogStartPretestOpen}
          key={screening.id}
          className="group block cursor-pointer"
        >
          <div className="flex flex-row gap-6">
            <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
              <FileSearch className="text-background m-auto h-12 w-12" />
            </div>
            <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
              <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Badge className="bg-secondary">Screening</Badge>
                  <CardTitle className="text-md font-bold md:text-xl">
                    {screening.name}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          </div>
          <DialogStartScreening
            open={dialogStartScreeningOpen}
            setOpen={setDialogStartScreeningOpen}
            id={screening.id}
          />
        </div>
      ))}
    </div>
  );
}
