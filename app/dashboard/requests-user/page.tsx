'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNewDepartment } from "@/features/departments/hooks/use-new-department";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteDepartments } from "@/features/departments/api/use-bulk-delete-department";
import { useGetDepartments } from "@/features/departments/api/use-get-departments";
import { useNewrequests } from "@/features/requests/hooks/use-new-requests";


export default function Departments() {

  const departmentsQuery = useGetDepartments();
  const departments = departmentsQuery.data || [] ;
  const {onOpen} = useNewrequests();

  console.log(departments)

  const deleteDepartments = useBulkDeleteDepartments()

  const isDisable = departmentsQuery.isLoading || departmentsQuery.isPending;

  if (departmentsQuery.isLoading) {
    return(
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">

      <Card className="border-none drop-shadow-sm">
        <CardHeader className="mx-auto">
          <Skeleton className="h-10 w-64 "/>
          <Skeleton className="h-20 w-64"/>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin "/>
          </div>
        </CardContent>
      </Card>

    </div>
    )
  }


  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">

      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2  lg:flex-row lg:items-center lg:justify-between">

          <CardTitle className="text-3xl line-clamp-1">Departments Page</CardTitle>
          <Button onClick={onOpen} size='sm'>
            <Plus className="size-4 mr-2"/> 
             Add new
            
          </Button>

        </CardHeader>
        <CardContent>
         <DataTable columns={columns} data={departments} filterKey="name" disabled={isDisable}
            onDelete={(row) => {
              const ids =row.map( r => r.original.id);
              deleteDepartments.mutate({ids})
            }} /> 
        </CardContent>
      </Card>

    </div>
  );
}
