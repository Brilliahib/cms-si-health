"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListTopicDiscussion from "@/components/molecules/card/CardListTopicDiscussion";
import { Button } from "@/components/ui/button";
import { useGetAllDiscussion } from "@/http/discussions/get-all-discussions";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardDiscussionWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllDiscussion(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-0">
        <DashboardTitle
          head="Forum Komunitas"
          body="Menampilkan topik diskusi di forum komunitas"
        />
        <Link
          href={"/dashboard/discussions/your-question"}
          className="mb-6 md:mb-0"
        >
          <Button>Kelola Pertanyaan Anda</Button>
        </Link>
      </div>
      <CardListTopicDiscussion data={data?.data || []} isLoading={isPending} />
    </div>
  );
}
