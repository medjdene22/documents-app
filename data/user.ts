import prisma from "@/lib/db";

export async function getUserByEmail(email: string){

    try {
        const existingUser = await prisma.user.findUnique({
            where: { 
                email: email
            }
        })
        return existingUser
        
    } catch (error) {
        return null
    }
    
}

export async function getUserById(id: string){

    try {
        const existingUser = await prisma.user.findUnique({
            where: { 
                id: id
            }
        })
        return existingUser
        
    } catch (error) {
        return null
    }
    
}