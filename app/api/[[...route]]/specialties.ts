import { Hono } from 'hono'
import { currentRole } from '@/lib/auth-lib'
import { db } from '@/db/drizzle'
import { departments, insertSpecialtiesSchima, specialties } from '@/db/schema'
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import{ string, z } from "zod"
import { and, inArray, eq } from 'drizzle-orm';


const app = new Hono()
    .get("/", zValidator("query", z.object({
        departmentId: z.string().optional(),
    })), async (c) => {

        const role = await currentRole()
        if(role !== "ADMIN"){
          return c.json({error: "Unauthorized, must be an admin"}, 401)
        }

        const {departmentId} = c.req.valid("query")
        const data = await db
        .select({
            id: specialties.id,
            name: specialties.name,
            departmentId: specialties.departmentId,
            department: departments.name
        })
        .from(specialties).innerJoin(departments, eq(specialties.departmentId, departments.id))
        .where( departmentId? eq(specialties.departmentId, departmentId) : undefined);

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
                id: specialties.id,
                name: specialties.name,
                departmentId: specialties.departmentId,
                department: departments.name
            })
            .from(specialties).innerJoin(departments, eq(specialties.departmentId, departments.id))
            .where( eq(specialties.id, id),);

        if (!data) {
            return c.json({error: "Not found,"}, 404)
        }    
        return c.json({data})
    })
    .post("/", zValidator("json", insertSpecialtiesSchima.omit({
          id: true,
      })), async (c) => {

        const role = await currentRole()
        if(role !== "ADMIN"){
            return c.json({error: "Unauthorized, must be an admin"}, 401)
        }
        const values = c.req.valid("json")

        const [data] = await db
          .insert(specialties).values({
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
                .delete(specialties)
                .where( eq(specialties.id, id),).
                returning({
                    id: specialties.id
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
        zValidator("json", insertSpecialtiesSchima.omit({
            id: true,
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
                .update(specialties)
                .set(values)
                .where( eq(specialties.id, id))
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
            .delete(specialties)
            .where(
                and(
                    inArray(specialties.id, values.ids),
                )
            ).returning({
                id: specialties.id
            });

        return c.json({data})
    })
export default app