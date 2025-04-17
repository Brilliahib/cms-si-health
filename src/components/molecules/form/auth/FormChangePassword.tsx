"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/http/auth/change-password";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/validators/auth/change-password-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormChangePassword() {
  const router = useRouter();

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onChange",
  });

  const { mutate: changePasswordHandler, isPending } = useChangePassword({
    onError: () => {
      toast.error("Gagal mengganti password baru!");
    },
    onSuccess: () => {
      toast.success("Berhasil mengganti password baru!");
      router.refresh();
    },
  });

  const onSubmit = (body: ChangePasswordType) => {
    changePasswordHandler({ ...body });
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password Lama <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan password lama"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password Baru <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan password baru"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Konfirmasi Password Baru{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan konfirmasi password baru"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
