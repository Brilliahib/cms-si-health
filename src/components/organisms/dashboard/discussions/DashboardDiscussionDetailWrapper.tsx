"use client";

import MessageDiscussion from "@/components/atoms/message/MessageDiscussion";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import CardListDiscussionComment from "@/components/molecules/card/CardListDiscussionComment";
import { useGetDetailDiscussion } from "@/http/discussions/get-detail-discussions";
import { useSession } from "next-auth/react";

interface DashboardDiscussionDetailWrapperProps {
  id: string;
}

export default function DashboardDiscussionDetailWrapper({
  id,
}: DashboardDiscussionDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data } = useGetDetailDiscussion(id, session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <section>
      <DashboardTitleBold head={`# ${data?.data.title ?? ""}`} />
      <MessageDiscussion id={id} />
      <CardListDiscussionComment data={data?.data.comments || []} />
    </section>
  );
}
