"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { client } from "@/lib/hono"
import { InferResponseType } from "hono"
import { Action } from "./action"
import DepartmentColumn from "./department-column"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type ResponseType = InferResponseType<typeof client.api.specialties.$get, 200>["data"][0]


export const columns: ColumnDef<ResponseType>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <div>
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>

    
          </div>
          
        )
      },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
        return (
          <div>
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Department
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell:({row}) => {
        return (
        <DepartmentColumn  department={row.original.department} departmentId={row.original.departmentId}/>
        )

      }
  },
  {
    id: "actions",
    cell: ({ row }) => <Action id={row.original.id} />
  }
]
