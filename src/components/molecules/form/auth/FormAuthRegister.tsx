"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  registerSchema,
  RegisterType,
} from "@/validators/auth/register-validator";
import { useRegister } from "@/http/auth/register";
import { toast } from "sonner";

export default function FormAuthRegister() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: registerRequestHandler, isPending } = useRegister({
    onError: (error) => {
      const errors = error.response?.data;

      if (errors) {
        Object.keys(errors).forEach((k) => {
          form.setError(k as keyof RegisterType, {
            type: "manual",
            message: errors[k][0],
          });
        });
      }

      toast.error("Register Failed", {
        description: "Check again the data you entered.",
      });
    },

    onSuccess: async () => {
      const res = await signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        redirect: false,
      });

      if (!res || res.error) {
        toast.error("Login Failed", {
          description: "An error occurred, please try again.",
        });
        return;
      }

      toast.success("Register Successful", {
        description:
          "Your account has been created and automatically logged in.",
      });
      return router.push("/dashboard");
    },
  });

  const onSubmit = (body: RegisterType) => {
    registerRequestHandler({ ...body });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="border-0 shadow-transparent w-full">
        <div className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Daftar
            </CardTitle>
            <CardDescription>
              Selamat datang! Silahkan daftar menggunakan akun anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan nama"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Masukkan password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Masukkan konfirmasi password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Daftar"}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <div className="text-center text-sm">
                Sudah punya akun? {""}
                <Link
                  href="/login"
                  className="text-primary underline underline-offset-4"
                >
                  Masuk Sekarang
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
