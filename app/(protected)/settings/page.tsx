import { auth, signOut } from "@/auth" 
import { Button } from "@/components/ui/button"
import { UserRole } from "@prisma/client"

export default async function SettingsPage() {

    const session = await auth()

    if (!session) {
        return (
        <h1>
            You are not logged in <br/>
        </h1>
        )
    }
    const logout = async () => {
        "use server"
        await signOut()
    }

    return (
        <div>
            <h1>Settings Pagg</h1>
            {session.user.role === UserRole.ADMIN && <p>You are loged in as admin</p>}
            {session.user.role === UserRole.USER && <p>You are loged in as user</p>}
            <br />
            <p>{JSON.stringify(session)}</p>
            <form action={logout}>
                <Button type="submit">Logout</Button>
            </form>
        </div>
    )
}