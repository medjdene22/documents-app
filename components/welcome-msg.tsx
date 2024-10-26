'use client'

import { useCurrentUser } from "@/hooks/use-current-user"


export default function WelcomeMsg(userName : {userName: string | null | undefined}) {
    const user = useCurrentUser()

  return (
    <div className="mb-4">
        <h2 className="text-2xl lg:text-4xl text-white font-medium">Welcome Back, {user?.name?.toLowerCase()}</h2>
    </div>
    )
}
