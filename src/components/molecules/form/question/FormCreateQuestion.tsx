"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  questionSchema,
  QuestionType,
} from "@/validators/question/question-validator";

import { useAddNewQuestion } from "@/http/question/create-question";
import { Plus } from "lucide-react";

interface FormCreateQuestionProps {
  id: string;
}

export default function FormCreateQuestion({ id }: FormCreateQuestionProps) {
  const router = useRouter();

  const form = useForm<QuestionType>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question_set_id: id,
      question_text: "",
      type: "multiple_choice",
      answer_key: "",
      options: [
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
      ],
    },
    mode: "onChange",
  });

  const questionType = form.watch("type");

  const { mutate: addNewQuestionTalkHandler, isPending } = useAddNewQuestion({
    onError: () => {
      toast.error("Gagal membuat soal baru!");
    },
    onSuccess: () => {
      toast.success("Berhasil membuat soal baru!");
      router.push(`/dashboard/admin/question-banks/${id}`);
    },
  });

  const onSubmit = (body: QuestionType) => {
    addNewQuestionTalkHandler({ ...body });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="question_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pertanyaan <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan pertanyaan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tipe Soal <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem>
                          <FormLabel className="font-normal">
                            <RadioGroupItem value="multiple_choice" />
                            <span className="ml-1">Pilihan Ganda</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="font-normal">
                            <RadioGroupItem value="essay" />
                            <span className="ml-1">Essay</span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answer_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kunci Jawaban <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan jawaban yang benar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionType === "multiple_choice" && (
                <FormField
                  control={form.control}
                  name="options"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Pilihan Jawaban <span className="text-red-500">*</span>
                      </FormLabel>

                      <RadioGroup
                        value={form
                          .getValues("options")
                          .findIndex((opt) => opt.is_correct === true)
                          .toString()}
                        onValueChange={(val) => {
                          const index = Number(val);
                          const updated = form
                            .getValues("options")
                            .map((opt, i) => ({
                              ...opt,
                              is_correct: i === index,
                            }));
                          form.setValue("options", updated, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }}
                        className="space-y-2"
                      >
                        {form.watch("options").map((_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              placeholder={`Opsi ${index + 1}`}
                              {...form.register(`options.${index}.option_text`)}
                            />
                            <FormItem className="mt-1">
                              <FormControl>
                                <RadioGroupItem value={index.toString()} />
                              </FormControl>
                            </FormItem>
                            <span className="text-muted-foreground text-sm">
                              Benar
                            </span>
                          </div>
                        ))}
                      </RadioGroup>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() =>
                          form.setValue("options", [
                            ...form.getValues("options"),
                            { option_text: "", is_correct: false },
                          ])
                        }
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Tambah Opsi Jawaban
                      </Button>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Tambahkan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
