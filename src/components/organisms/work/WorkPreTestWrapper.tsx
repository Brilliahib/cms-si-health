"use client";

import { useSession } from "next-auth/react";
import { AppSidebarWork } from "../sidebar/app-sidebar-work";
import { useGetDetailPreTest } from "@/http/test/get-detail-pre-test";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import BreadcrumbNavWork from "@/components/atoms/breadcrumb/BreadcrumbWork";
import { Skeleton } from "@/components/ui/skeleton";

interface WorkPreTestWrapperProps {
  id: string;
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

export default function WorkPreTestWrapper({ id }: WorkPreTestWrapperProps) {
  const { data: session, status } = useSession();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const { data, isLoading } = useGetDetailPreTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!session?.access_token,
    },
  );

  const questions = data?.data?.question_set?.questions ?? [];

  return (
    <SidebarProvider>
      <SidebarInset>
        {data?.data && <BreadcrumbNavWork data={data.data} />}
        <div className="p-6 py-20">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-10 w-full rounded-md" />
                ))}
              </div>
            </div>
          ) : questions.length > 0 ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">
                Soal No. {selectedQuestionIndex + 1}
              </h1>
              <p>{questions[selectedQuestionIndex].question_text}</p>

              {questions[selectedQuestionIndex].type === "multiple_choice" && (
                <ul className="space-y-3">
                  {questions[selectedQuestionIndex].options.map(
                    (
                      option: { id: string; option_text: string },
                      index: number,
                    ) => (
                      <li
                        key={option.id}
                        className="border-primary hover:bg-muted rounded-md border px-3 py-2"
                      >
                        <span className="mr-2 font-semibold">
                          {OPTION_LABELS[index]}.
                        </span>
                        {option.option_text}
                      </li>
                    ),
                  )}
                </ul>
              )}

              {questions[selectedQuestionIndex].type === "essay" && (
                <textarea
                  placeholder="Tulis jawabanmu..."
                  className="w-full rounded border p-3"
                />
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-10 w-full rounded-md" />
                ))}
              </div>
            </div>
          )}
        </div>
      </SidebarInset>

      <AppSidebarWork
        data={data?.data}
        isLoading={isLoading || !data?.data}
        selectedIndex={selectedQuestionIndex}
        onSelect={(index) => setSelectedQuestionIndex(index)}
      />
    </SidebarProvider>
  );
}
