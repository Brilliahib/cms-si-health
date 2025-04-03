"use client";

import { useSession } from "next-auth/react";
import { AppSidebarWork } from "../sidebar/app-sidebar-work";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import BreadcrumbNavWork from "@/components/atoms/breadcrumb/BreadcrumbWork";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DialogConfirmSubmit from "@/components/atoms/dialog/DialogConfirmSubmit";
import { useGetDetailPostTest } from "@/http/test/get-detail-post-test";
import { SubmitPostTest } from "@/types/test/post-test";
import { useAddSubmitPostTest } from "@/http/test/submit-post-test";

interface WorkPostTestWrapperProps {
  id: string;
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

export default function WorkPostTestWrapper({ id }: WorkPostTestWrapperProps) {
  const { data: session, status } = useSession();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const openConfirmDialog = () => setConfirmDialogOpen(true);
  const closeConfirmDialog = () => setConfirmDialogOpen(false);
  const router = useRouter();

  const { data, isLoading } = useGetDetailPostTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!session?.access_token,
    },
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Jawaban Anda akan hilang jika halaman direfresh.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const questions = data?.data?.questions ?? [];

  const [answers, setAnswers] = useState<SubmitPostTest[]>([]);

  const { mutate: submitPretest } = useAddSubmitPostTest({
    onSuccess: () => {
      toast.success("Post Test berhasil disubmit!");
      router.push("/dashboard/history");
    },
    onError: () => {
      toast.error("Gagal submit post test. Silakan coba lagi.");
    },
  });

  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          {data?.data && (
            <BreadcrumbNavWork data={data.data} onFinish={openConfirmDialog} />
          )}
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
                <h1 className="text-xl font-semibold">
                  Soal No. {selectedQuestionIndex + 1}
                </h1>
                <p>{questions[selectedQuestionIndex].question_text}</p>
                <ul className="space-y-3">
                  {questions[selectedQuestionIndex].options.map(
                    (option, index) => {
                      const isSelected = answers.find(
                        (ans) =>
                          ans.question_id ===
                            questions[selectedQuestionIndex].id &&
                          ans.selected_option_id === option.id,
                      );

                      return (
                        <li
                          key={option.id}
                          className={`border-primary hover:bg-muted cursor-pointer rounded-md border px-3 py-2 ${
                            isSelected
                              ? "bg-primary hover:bg-primary text-white"
                              : ""
                          }`}
                          onClick={() => {
                            const updated = [...answers];
                            const existingIndex = updated.findIndex(
                              (a) =>
                                a.question_id ===
                                questions[selectedQuestionIndex].id,
                            );

                            if (existingIndex !== -1) {
                              updated[existingIndex].selected_option_id =
                                option.id;
                            } else {
                              updated.push({
                                question_id:
                                  questions[selectedQuestionIndex].id,
                                selected_option_id: option.id,
                              });
                            }
                            setAnswers(updated);
                          }}
                        >
                          <span className="mr-2 font-semibold">
                            {OPTION_LABELS[index]}.
                          </span>
                          {option.option_text}
                        </li>
                      );
                    },
                  )}
                </ul>
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
      <DialogConfirmSubmit
        open={isConfirmDialogOpen}
        onClose={closeConfirmDialog}
        unansweredNumbers={questions
          .map((q, index) => ({
            number: index + 1,
            isAnswered: answers.some((a) => a.question_id === q.id),
          }))
          .filter((q) => !q.isAnswered)
          .map((q) => q.number)}
        onConfirm={() => {
          submitPretest({
            post_test_id: id,
            answers,
          });
          setConfirmDialogOpen(false);
        }}
      />
    </>
  );
}
