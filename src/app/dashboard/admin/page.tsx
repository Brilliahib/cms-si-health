import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin | Dialisis Connect Edu",
};

export default function DashboardAdminPage() {
  return (
    <>
      <DashboardTitle
        head="Dashboard Admin"
        body="Selamat datang di Dashboard Admin!"
      />
    </>
  );
}
