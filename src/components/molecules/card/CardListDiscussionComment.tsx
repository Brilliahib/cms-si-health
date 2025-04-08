import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BASE_URL } from "@/lib/url";
import { DiscussionComment } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";

interface CardListDiscussionCommentProps {
  data: DiscussionComment[];
}

export default function CardListDiscussionComment({
  data,
}: CardListDiscussionCommentProps) {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center">
          <MessagesSquare className="h-10 w-10" />
          <p className="text-sm">
            Belum ada obrolan diskusi nih! Mulai diskusi yuk ✨
          </p>
        </div>
      ) : (
        data.map((comment) => (
          <Card key={comment.id} className="shadow-none">
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 rounded-full">
                      <AvatarFallback
                        className={`${getAvatarColor(comment.user.id)} rounded-full text-xs font-semibold text-white`}
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
                    src={`${BASE_URL}/public/${comment.image_path}`}
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
  );
}
