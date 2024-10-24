
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton";
import { useNewSpecialties } from "@/features/specialties/hooks/use-new-specialties";
import { useGetSpecialties } from "@/features/specialties/api/use-get-specialties";
import { useBulkDeleteSpecialties } from "@/features/specialties/api/use-bulk-delete-specialtie";

export default function Specialties() {

  const specialtiesQuery = useGetSpecialties();
  const specialties = specialtiesQuery.data || [] ;
  const {onOpen} = useNewSpecialties();


  const deleteSpecialties = useBulkDeleteSpecialties()

  const isDisable = specialtiesQuery.isLoading || specialtiesQuery.isPending;

  if (specialtiesQuery.isLoading) {
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

          <CardTitle className="text-3xl line-clamp-1">Specialties Page</CardTitle>
          <Button onClick={onOpen} size='sm'>
            <Plus className="size-4 mr-2"/> 
             Add new
            
          </Button>

        </CardHeader>
        <CardContent>
         <DataTable columns={columns} data={specialties} filterKey="name" disabled={isDisable}
            onDelete={(row) => {
              const ids =row.map( r => r.original.id);
              deleteSpecialties.mutate({ids})
            }} /> 
        </CardContent>
      </Card>

    </div>
  );
}
