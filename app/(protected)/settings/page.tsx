import { auth, signOut } from "@/auth" 
import { Button } from "@/components/ui/button"

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
            <p>You are loged in</p>
            <p>{JSON.stringify(session)}</p>
            <form action={logout}>
                <Button type="submit">Logout</Button>
            </form>
        </div>
    )
}