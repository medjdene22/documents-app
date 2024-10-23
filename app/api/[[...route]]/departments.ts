import { Hono } from 'hono'
import { currentRole } from '@/lib/auth-lib'
import { db } from '@/db/drizzle'
import { departments, insertDepartmentSchima } from '@/db/schema'
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import{ string, z } from "zod"
import { and, inArray, eq } from 'drizzle-orm';


const app = new Hono()
    .get("/",  async (c) => {

        const role = await currentRole()
        if(role !== "ADMIN"){
          return c.json({error: "Unauthorized, must be an admin"}, 401)
        }

       const data = await db.select().from(departments)

        return c.json({data})
    })
    .get("/:id", zValidator("param", z.object({
        id: string().optional(),
    })),  async (c) => {

        const role = await currentRole()
        if(role !== "ADMIN"){
            return c.json({error: "Unauthorized, must be an admin"}, 401)
        }
        
        const { id } = c.req.valid("param")
        if (!id) {
            return c.json({error: "Bad request, messing id"}, 400)
        }
        const [ data ] = await db
            .select({
                id: departments.id,
                name: departments.name,
            })
            .from(departments)
            .where( eq(departments.id, id),);

        if (!data) {
            return c.json({error: "Not found,"}, 404)
        }    
        return c.json({data})
    })
    .post("/", zValidator("json", insertDepartmentSchima.pick({
          name: true,
      })), async (c) => {

        const role = await currentRole()
        if(role !== "ADMIN"){
            return c.json({error: "Unauthorized, must be an admin"}, 401)
        }
        const values = c.req.valid("json")

     
        const [data] = await db
          .insert(departments).values({
              id: createId(),
              ...values,
          }).returning();

      return c.json({data})
    })
    .delete("/:id", zValidator("param", z.object({
            id: string().optional(),
        })), async (c) => {

            const role = await currentRole()
            if(role !== "ADMIN"){
                return c.json({error: "Unauthorized, must be an admin"}, 401)
            }  

            const { id } = c.req.valid("param")
            if (!id) {
                return c.json({error: "Bad request, messing id"}, 400)
            }

            const data  = await db
                .delete(departments)
                .where( eq(departments.id, id),).
                returning({
                    id: departments.id
                });

   
            if (!data) {
                return c.json({error: "Not found,"}, 404)
            }    
            return c.json({data})
    })
    .patch( "/:id",

        zValidator("param", z.object({
            id: string().optional(),
        })),
        zValidator("json", insertDepartmentSchima.pick({
            name: true,
        })),

        async (c) => {

            const role = await currentRole()
            if(role !== "ADMIN"){
                return c.json({error: "Unauthorized, must be an admin"}, 401)
            }   

            const values = c.req.valid("json")
            const { id } = c.req.valid("param")
            if (!id) {
                return c.json({error: "Bad request, messing id"}, 400)
            }

            const data  = await db
                .update(departments)
                .set(values)
                .where( eq(departments.id, id))
                .returning();

            if (!data) {
                return c.json({error: "Not found,"}, 404)
            }    
            return c.json({data})
    })

    .post( "/bulk-delete",
        zValidator(
            "json",
            z.object({
                ids: z.array(z.string()),
            }),
        ),

    async (c) => {

        const role = await currentRole()
        if(role !== "ADMIN"){
            return c.json({error: "Unauthorized, must be an admin"}, 401)
        } 
        const values = c.req.valid("json")
   
        const data = await db
            .delete(departments)
            .where(
                and(
                    inArray(departments.id, values.ids),
                )
            ).returning({
                id: departments.id
            });


        return c.json({data})
    })
export default app