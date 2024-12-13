"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { ticketStatuses } from "../data/data";
// import { Ticket } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { AttendeeInfo } from "@/models/attendeesSchema";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const columns: ColumnDef<AttendeeInfo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "ticketId",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ticket ID" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[80px]">{row.getValue("ticketId")}</div>
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  // },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Id" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("orderId")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer names" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("customerName")}
      </span>
    ),
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: "ticketType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticket type" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("ticketType")}
      </span>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "checkedIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("checkedIn")?(<Badge variant='default'>Checked in</Badge>):(<Badge variant='outline'>Not checked in</Badge>)}</span>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  // {
  //   accessorKey: "ticketPrice",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ticket Price" />
  //   ),
  //   cell: ({ row }) => (
  //     <span className="font-medium">${row.getValue("ticketPrice")}</span>
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "ticketStatus",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ticket Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = ticketStatuses.find(
  //       (status) => status.value === row.getValue("ticketStatus")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "checkedInTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Checked in time" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">
        {row.getValue('checkedInTime')?new Date(row.getValue("checkedInTime"))?.toLocaleDateString():"-"}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "checkInNow",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="action" />
    // ),
    cell: ({ row }) => (
      <div className="w-[100px]">
       <Button variant='link' className=" "> <CheckCircle className="h-3.5"/> Check in now</Button>
        </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  // {
  //   accessorKey: "issuedTo",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Issued To" />
  //   ),
  //   cell: ({ row }) => (
  //     <span className="max-w-[200px] truncate font-medium">
  //       {row.getValue("issuedTo")}
  //     </span>
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "issuedBy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Issued By" />
  //   ),
  //   cell: ({ row }) => (
  //     <span className="max-w-[200px] truncate font-medium">
  //       {row.getValue("issuedBy")}
  //     </span>
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "qrCode",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="QR Code" />
  //   ),
  //   cell: ({ row }) => (
  //     <span className="font-medium">{row.getValue("qrCode")}</span>
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
