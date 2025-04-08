import MessageDiscussionAnswer from "@/components/atoms/message/MessageDiscussionAnswer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/url";
import { DiscussionCommentAnswer } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CardListDiscussionCommentAnswerProps {
  data: DiscussionCommentAnswer[];
  isLoading: boolean;
  id: string;
}

export default function CardListDiscussionCommentAnswer({
  data,
  id,
  isLoading,
}: CardListDiscussionCommentAnswerProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-none">
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-48 w-full rounded-xl md:max-w-2xl" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Balasan</h1>
        <Button onClick={() => setShowReplyForm((prev) => !prev)}>
          {showReplyForm ? "Tutup" : "Beri Balasan"}
        </Button>
      </div>

      {showReplyForm && <MessageDiscussionAnswer id={id} />}

      <div className="flex flex-col gap-4">
        {data.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center">
            <MessagesSquare className="h-10 w-10" />
            <p className="text-sm">
              Belum ada balasan diskusi nih! Mulai bales diskusinya yuk ✨
            </p>
          </div>
        ) : (
          data.map((comment) => (
            <Card className="shadow-none" key={comment.id}>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10 rounded-full">
                        <AvatarFallback
                          className={`${getAvatarColor(
                            comment.user.id,
                          )} rounded-full text-xs font-semibold text-white`}
                        >
                          {generateFallbackFromName(comment.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h1>{comment.user.name}</h1>
                        <p className="text-muted-foreground text-sm">
                          {formatRelativeTime(comment.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {comment.image_path && (
                    <Image
                      src={`${BASE_URL}/storage/${comment.image_path}`}
                      alt="Foto"
                      width={1000}
                      height={1000}
                      className="rounded-xl md:max-w-2xl"
                    />
                  )}
                  <h1>{comment.comment}</h1>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
