"use client";

import { useGetCheckPersonalInformation } from "@/http/personal-information/get-check-personal-information";
import { useSession } from "next-auth/react";
import WorkScreeningPersonalInformation from "./WorkScreeningPersonalInformation";
import WorkScreeningPersonalInformationSuccess from "./WorkScreeningPersonalInformationSuccess";

interface WorkScreeningPersonalInformationWrapperProps {
  id: string;
}

export default function WorkScreeningPersonalInformationWrapper({
  id,
}: WorkScreeningPersonalInformationWrapperProps) {
  const { data: session, status } = useSession();
  const { data } = useGetCheckPersonalInformation(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!session?.access_token,
    },
  );

  if (data?.data.is_completed === false) {
    return <WorkScreeningPersonalInformation id={id} />;
  }

  if (data?.data.is_completed === true) {
    return <WorkScreeningPersonalInformationSuccess id={id} />;
  }
}
