import RegisterWrapperContent from "@/components/organisms/auth/RegisterWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | Sistem Informasi Kesehatan Ginjal",
  description: "Daftar untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthRegisterPage() {
  return <RegisterWrapperContent />;
}
