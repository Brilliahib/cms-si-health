"use client";

import MessageDiscussion from "@/components/atoms/message/MessageDiscussion";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListDiscussionComment from "@/components/molecules/card/CardListDiscussionComment";
import { useGetDetailDiscussion } from "@/http/discussions/get-detail-discussions";
import { useSession } from "next-auth/react";

interface DashboardAdminDetailDiscussionWrapperProps {
  id: string;
}

export default function DashboardAdminDetailDiscussionWrapper({
  id,
}: DashboardAdminDetailDiscussionWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailDiscussion(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <div>
      <DashboardTitle
        head={data?.data.title ?? ""}
        body="Menampilkan detail topik disuksi beserta list diskusi dari topik"
      />
      <MessageDiscussion id={id} />
      <CardListDiscussionComment
        data={data?.data.comments || []}
        isLoading={isPending}
      />
    </div>
  );
}
