import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Discussion } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import Link from "next/link";

interface CardListTopicDiscussionProps {
  data: Discussion[];
}

export default function CardListTopicDiscussion({
  data,
}: CardListTopicDiscussionProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((discussion) => (
        <Link
          key={discussion.id}
          href={`/dashboard/discussions/${discussion.id}`}
        >
          <Card className="shadow-none">
            <CardContent>
              <div className="space-y-4">
                <h1 className="font-medium">{discussion.title}</h1>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  {discussion.comments.length > 0 && (
                    <div className="flex items-center gap-1">
                      {[
                        ...new Map(
                          discussion.comments.map((comment) => [
                            comment.user.id,
                            comment,
                          ]),
                        ).values(),
                      ].map((comment) => (
                        <div key={comment.user.id}>
                          <Avatar className="h-8 w-8 rounded-full">
                            <AvatarFallback
                              className={`rounded-full text-xs font-semibold text-white ${getAvatarColor(comment.user.id)}`}
                            >
                              {generateFallbackFromName(comment.user.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-muted-foreground text-sm">
                    {discussion.comments.length} Komentar
                  </p>
                  {discussion.comments.length > 0 && (
                    <span className="text-muted-foreground hidden text-xs md:flex">
                      •
                    </span>
                  )}
                  {discussion.comments.length > 0 && (
                    <p className="text-muted-foreground hidden text-sm md:flex">
                      Balasan terakhir{" "}
                      {formatRelativeTime(discussion.comments[0].created_at)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
