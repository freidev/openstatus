"use client";

import Image from "next/image";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";

import type { Page } from "@openstatus/db/src/schema";
import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@openstatus/ui";

import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<
  Page & { monitorsToPages: { monitor: { name: string } }[] }
>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link
          href={`./status-pages/${row.original.id}/edit`}
          className="group flex items-center gap-2"
        >
          <span className="max-w-[125px] truncate group-hover:underline">
            {row.getValue("title")}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      return <span className="font-mono">{row.getValue("slug")}</span>;
    },
  },
  {
    accessorKey: "monitorsToPages",
    header: "Monitors",
    cell: ({ row }) => {
      const monitorsToPages = row.getValue("monitorsToPages");
      const monitors = z
        .object({ monitor: z.object({ name: z.string() }) })
        .array()
        .parse(monitorsToPages);
      const firstMonitors = monitors.splice(0, 2);
      const lastMonitors = monitors;
      return (
        <div className="flex items-center gap-2">
          <span className="flex max-w-[150px] gap-2 truncate font-medium sm:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px]">
            {firstMonitors.map(({ monitor: { name } }, i) => (
              <Badge key={i} variant="outline">
                {name}
              </Badge>
            ))}
          </span>
          {lastMonitors.length > 0 ? (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="border">
                    +{lastMonitors.length}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top" className="flex gap-2">
                  {lastMonitors.map(({ monitor: { name } }, i) => (
                    <Badge key={i} variant="outline">
                      {name}
                    </Badge>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "icon",
    header: "Favicon",
    cell: ({ row }) => {
      if (!row.getValue("icon")) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <Image
          src={row.getValue("icon")}
          alt=""
          className="border-border rounded-sm border"
          width={20}
          height={20}
        />
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created",
  //   cell: ({ row }) => {
  //     return <span>{formatDate(row.getValue("createdAt"))}</span>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <DataTableRowActions row={row} />
        </div>
      );
    },
  },
];
