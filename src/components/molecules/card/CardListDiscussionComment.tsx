import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/lib/url";
import { DiscussionComment } from "@/types/discussions/discussion";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import { Ellipsis, Trash2, Undo2 } from "lucide-react";
import Image from "next/image";

interface CardListDiscussionCommentProps {
  data: DiscussionComment[];
}

export default function CardListDiscussionComment({
  data,
}: CardListDiscussionCommentProps) {
  return (
    <div className="space-y-4">
      {data.map((comment) => (
        <Card key={comment.id} className="shadow-none">
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 rounded-full">
                    <AvatarFallback className="rounded-full text-xs font-semibold">
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-muted-foreground data-[state=open]:bg-muted flex size-8"
                      size="icon"
                    >
                      <Ellipsis className="text-muted-foreground h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Undo2 />
                      Balas Pesan
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 /> Hapus Pesan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
      ))}
    </div>
  );
}
