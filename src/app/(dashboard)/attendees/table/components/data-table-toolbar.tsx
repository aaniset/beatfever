// "use client";

// import { Cross2Icon } from "@radix-ui/react-icons";
// import { Table } from "@tanstack/react-table";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "./data-table-view-options";

// import { orderStatuses, paymentStatuses } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>;
// }

// export function DataTableToolbar<TData>({
//   table,
// }: DataTableToolbarProps<TData>) {
//   const isFiltered = table.getState().columnFilters.length > 0;

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex flex-1 items-center space-x-2">
//         <Input
//           placeholder="Filter tasks..."
//           value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("customerName")?.setFilterValue(event.target.value)
//           }
//           className="h-8 w-[150px] lg:w-[250px]"
//         />
//         {table.getColumn("paymentStatus") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("paymentStatus")}
//             title="Payment Status"
//             options={  paymentStatuses}
//           />
//         )}
//         {table.getColumn("orderStatus") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("orderStatus")}
//             title="Order Status"
//             options={ orderStatuses}
//           />
//         )}
//         {isFiltered && (
//           <Button
//             variant="ghost"
//             onClick={() => table.resetColumnFilters()}
//             className="h-8 px-2 lg:px-3"
//           >
//             Reset
//             <Cross2Icon className="ml-2 h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <DataTableViewOptions table={table} />
//     </div>
//   );
// }
"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { ticketStatuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tickets..."
          value={(table.getColumn("issuedTo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("issuedTo")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("ticketStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("ticketStatus")}
            title="Ticket Status"
            options={ticketStatuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
