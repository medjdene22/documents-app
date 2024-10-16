"use client"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"

export default function AdminPage() {

    const onApiRouteClick = () => {
        fetch("/api/admin")
            .then(res => {
                if(res.ok) toast.success("Allowed API route")
                else toast.error("Forbidden API route")
            })
    }

    const onAServerActionClick = () => {
        fetch("/api/admin")
            .then(res => {
                if(res.ok) toast.success("Allowed API route")
                else toast.error("Forbidden API route")
            })
    }

    return (
        <Card className="bg-white w-[600px] shadow-xl rounded-xl">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Admin Page
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={"ADMIN"}>
                    <FormSuccess message={"You are an admin"}/>
                </RoleGate>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-bold">
                        Admin-only API Route
                    </p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>

                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-bold">
                        Admin-only server Action
                    </p>
                    <Button onClick={onAServerActionClick}>Click to test</Button>
                </div>
                
            </CardContent>
            
        </Card>
    )
}