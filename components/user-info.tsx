import { ExtendingUser } from "@/auth"
import { Card, CardContent, CardHeader } from "./ui/card"


interface UserInfoProps {
    user?: ExtendingUser,
    label: string,
}

export const UserInfo = ({
    user,
    label
}: UserInfoProps) => {

    return (
        <Card className="w-[600px] shadow-xl">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-bold">
                        ID
                    </p>
                    <p>{user?.id}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-bold">
                        Email
                    </p>
                    <p>{user?.email}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-bold">
                        Full name
                    </p>
                    <p>{user?.name}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-bold">
                        Matricule
                    </p>
                    <p>{user?.matricule || "empty"}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-bold">
                        Role
                    </p>
                    <p>{user?.roles}</p>
                </div>
                
            </CardContent>
        </Card>
    )
}    