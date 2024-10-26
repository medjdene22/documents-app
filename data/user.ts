import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
export async function getUserByEmail(email: string){

    try {
        const [existingUser] = await db.select().from(users)
            .where(eq(users.email, email))

        return existingUser
        
    } catch (error) {
        return null
    }
    
}

export async function getUserById(id: string){

    try {
        const [existingUser] = await db.select().from(users)
        .where(eq(users.id, id))
        return existingUser
        
    } catch (error) {
        return null
    }
    
}