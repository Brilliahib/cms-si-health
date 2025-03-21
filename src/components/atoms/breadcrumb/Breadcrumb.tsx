"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const getBreadcrumbLabel = (segment: string) => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="fixed z-50 flex h-14 w-full items-center border-b bg-white/50 px-5 backdrop-blur dark:bg-slate-950/50">
      <div className="flex items-center gap-x-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {pathname && (
          <Breadcrumb>
            <BreadcrumbList>
              {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem key={`breadcrumb-item-${index}`}>
                      <BreadcrumbLink href={href}>
                        {getBreadcrumbLabel(segment)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < segments.length - 1 && (
                      <BreadcrumbSeparator
                        key={`breadcrumb-separator-${index}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </nav>
  );
}
