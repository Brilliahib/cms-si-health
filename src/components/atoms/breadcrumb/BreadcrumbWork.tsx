"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TesDetail } from "@/types/test/test-detail";
import { useSidebar } from "@/components/ui/sidebar";
import { Check, LayoutGrid } from "lucide-react";
import Image from "next/image";

interface BreadcrumNavWorkProps {
  data?: TesDetail;
  onFinish: () => void;
}

export default function BreadcrumbNavWork({
  data,
  onFinish,
}: BreadcrumNavWorkProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="bg-sidebar fixed z-50 flex h-16 w-full items-center border-b px-6 backdrop-blur dark:bg-slate-950/50">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo/undip.png"
              alt="Sistem Informasi Kesehatan Ginjal"
              width={30}
              height={30}
            />
          </div>
          <h1 className="font-semibold uppercase">{data?.name}</h1>
        </div>

        <div className="space-x-2">
          <Button size="lg" onClick={onFinish}>
            <Check className="h-5 w-5" />
            <span className="ml-2 hidden md:inline">Selesai</span>
          </Button>
          <Button size="lg" variant="secondary" onClick={() => toggleSidebar()}>
            <LayoutGrid className="h-5 w-5" />
            <span className="ml-2 hidden md:inline">Daftar Soal</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
