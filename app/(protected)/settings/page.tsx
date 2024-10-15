"use client"

import { Logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function SettingsPage() {

    const user = useCurrentUser()

    const onLogout = () => { 
        Logout() 
    }

    return (
        <div className="bg-white p-10 rounded-xl"> 
            <h1>Settings Page</h1>
            <h3>user: {user?.email}</h3>

            <Button onClick={onLogout}>Logout</Button>
        </div>
    )
}