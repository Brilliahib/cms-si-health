"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
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
      options: [
        { option_text: "", score: null },
        { option_text: "", score: null },
      ],
    },
    mode: "onChange",
  });

  const questionType = form.watch("type");

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "options",
  });

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

              {questionType === "multiple_choice" && (
                <div>
                  <FormLabel className="mb-4">
                    Pilihan Jawaban <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-2 items-start gap-4"
                      >
                        <FormField
                          control={form.control}
                          name={`options.${index}.option_text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opsi {index + 1}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Opsi jawaban ${index + 1}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`options.${index}.score`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Skor</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Masukan skor jawaban"
                                  {...field}
                                  value={field.value ?? ""}
                                />
                              </FormControl>
                              <FormDescription>
                                * Tidak usah pakai (+ atau -) langsung angka.
                                Contoh: 4
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => append({ option_text: "", score: null })}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Tambah Opsi Jawaban
                  </Button>
                </div>
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
