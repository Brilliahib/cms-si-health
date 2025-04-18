"use client";

import { ReactNode } from "react";
import { useGetCheckPersonalInformation } from "@/http/personal-information/get-check-personal-information";
import DashboardPersonalInformationWrapper from "../dashboard/DashboardPersonalInformationWrapper";

export default function ClientDashboardWrapper({
  accessToken,
  role,
  children,
}: {
  accessToken: string;
  role: string;
  children: ReactNode;
}) {
  const shouldCheckPersonalInfo =
    role !== "admin" && role !== "medical_personal";

  const { data, isLoading } = useGetCheckPersonalInformation(accessToken, {
    enabled: !!accessToken && shouldCheckPersonalInfo,
  });

  if (shouldCheckPersonalInfo && isLoading) return <div>Loading...</div>;

  if (shouldCheckPersonalInfo && data?.data.is_completed === false) {
    return <DashboardPersonalInformationWrapper />;
  }

  return <>{children}</>;
}
