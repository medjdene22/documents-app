"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { client } from "@/lib/hono"
import { InferResponseType } from "hono"
import { Action } from "./action"

// This type is used to define the shape of our data.

type ResponseType = InferResponseType<typeof client.api.requests.$get, 200>["data"][0]


export const columns: ColumnDef<ResponseType>[] = [
  
  {
    accessorKey: "document",
    header: ({ column }) => {
        return (
          <div>
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Document
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>

    
          </div>
          
        )
      },
  },
  
  {
    id: "actions",
    cell: ({ row }) => <Action id={row.original.id} />
  }
]
