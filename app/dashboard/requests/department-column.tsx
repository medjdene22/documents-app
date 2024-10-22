"use client"
import { useOpenDepartment } from "@/features/departments/hooks/use-open-department ";

type Props= {
  department: string;
  departmentId: string;
}

export default function DepartmentColumn({
  department,
  departmentId,
} : Props) {

  const {onOpen : onOpenDepartment} = useOpenDepartment();
  const onClick=() => {
    onOpenDepartment(departmentId)
  }

  return (
    <div className="flex items-center cursor-pointer hover:underline" onClick={onClick}>
      {department}
    </div>
  )
}
