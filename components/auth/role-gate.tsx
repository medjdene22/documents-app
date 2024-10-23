"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";

interface Props {
    children: React.ReactNode;
    allowedRole: "USER" | "ADMIN";
}

export function RoleGate({
    children,
    allowedRole,
}: Props) {

    const role = useCurrentRole()
    
    if(role !== allowedRole){
        return <FormError message="You are not authorized to access this page"/>
    }

    return <>{children}</>
}