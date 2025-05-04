import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DiscussionComment } from "@/types/discussions/discussion";
import { formatRelativeTime } from "@/utils/time-relative";
import { Globe, Lock } from "lucide-react";
import Link from "next/link";

interface CardDiscussionYourQuestionProps {
  data: DiscussionComment[];
  isLoading: boolean;
}

export default function CardDiscussionYourQuestion({
  data,
  isLoading,
}: CardDiscussionYourQuestionProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <Card className="shadow-none" key={i}>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-20 rounded-full" />{" "}
              {/* Simulasi Badge */}
              <Skeleton className="h-4 w-3/4" /> {/* Komentar */}
            </CardContent>
            <CardFooter>
              <Skeleton className="h-3 w-24" /> {/* Tanggal/waktu */}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((comment) => (
        <Link
          href={`/dashboard/discussions/${comment.id}/answers`}
          key={comment.id}
        >
          <Card className="shadow-none">
            <CardContent className="space-y-4">
              <Badge
                variant={"outline"}
                className={
                  comment.is_private === true
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {comment.is_private === false ? (
                  <>
                    <Lock size={14} className="mr-1" />
                    Privasi
                  </>
                ) : (
                  <>
                    <Globe size={14} className="mr-1" />
                    Publik
                  </>
                )}
              </Badge>

              <h1 className="max-w-xl font-medium break-words whitespace-normal">
                {comment.comment}
              </h1>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-sm">
                {formatRelativeTime(comment.created_at)}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
