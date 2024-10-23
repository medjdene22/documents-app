'use client';

import { NewDepartmentSheet } from "@/features/departments/components/new-department-sheet";
import { EditDepartmentSheet } from "@/features/departments/components/edit-department-sheet";
import { useMountedState } from "react-use"
import { NewSpecialtiesSheet } from "@/features/specialties/components/new-specialties-sheet";
import { EditSpecialtiesSheet } from "@/features/specialties/components/edit-specialties-sheet";


export const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return(
    <>
      <NewDepartmentSheet/>
      <EditDepartmentSheet/>

      <NewSpecialtiesSheet/>
      <EditSpecialtiesSheet/>

    </>
  )
}

