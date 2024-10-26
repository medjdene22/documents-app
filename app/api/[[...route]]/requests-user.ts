import { Hono } from 'hono'
import { currentUser } from '@/lib/auth-lib'
import { db } from '@/db/drizzle'
import { departments, insertRequestSchima, requests, specialties } from '@/db/schema'
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import{ string, z } from "zod"
import { and, eq } from 'drizzle-orm';


const app = new Hono()
    .get("/", async (c) => {

        const user = await currentUser()
        if(!user?.id){
            return c.json({error: "Unauthorized, please login"}, 401)
        }

        const data = await db
        .select({
            id: requests.id,
            document: requests.document,
            department: departments.name,
            specialties: specialties.name,
            status: requests.status,
            note: requests.note,
            createdAt: requests.createdAt,
        })
        .from(requests)
        .innerJoin(departments, eq(requests.departmentId, departments.id))
        .innerJoin(specialties, eq(requests.specialtyId, specialties.id))
        .where( eq(requests.userId, user?.id));

        return c.json({data})
    })

    .get("/:id", zValidator("param", z.object({
        id: string().optional(),
    })),  async (c) => {

        const user = await currentUser()
        if(!user?.id){
            return c.json({error: "Unauthorized, please login"}, 401)
        }
        
        const { id } = c.req.valid("param")
        if (!id) {
            return c.json({error: "Bad request, messing id"}, 400)
        }

        const [data] = await db
        .select({
            id: requests.id,
            document: requests.document,
            department: departments.name,
            specialties: specialties.name,
            status: requests.status,
            note: requests.note,
            createdAt: requests.createdAt,
        })
        .from(requests)
        .innerJoin(departments, eq(requests.departmentId, departments.id))
        .innerJoin(specialties, eq(requests.specialtyId, specialties.id))
        .where(
            and(
                eq(requests.userId, user?.id),
                eq(requests.id, id)
            )
        );
        return c.json({data})

    })
    .post("/", zValidator("json", insertRequestSchima.omit({
          id: true,
          status: true,
          userId: true,
          createdAt: true,
      })), async (c) => {

        const user = await currentUser()
        if(!user?.id){
            return c.json({error: "Unauthorized, please login"}, 401)
        }

        if(!user?.matricule || !user?.name){
            return c.json({error: "Messing informaion, add it in settings"}, 401)
        }

        const values = c.req.valid("json")

        const [existingRequest] = await db
            .select({
              id: requests.id,
            })
            .from(requests)
            .where(
              and(
                  eq(requests.userId, user?.id),
                  eq(requests.document, values.document),
                  eq(requests.status, "PENDING")
            )
        )
        if (existingRequest) {
            return c.json({error: "Already exists"}, 400)
        }


        const [data] = await db
          .insert(requests).values({
              id: createId(),
              userId: user?.id,
              createdAt: new Date(),
              ...values,
          }).returning();

      return c.json({data})
    })

    .delete("/:id", zValidator("param", z.object({
            id: string().optional(),
        })), async (c) => {

            const user = await currentUser()
            if(!user?.id){
            return c.json({error: "Unauthorized, please login"}, 401)
            }    

            const { id } = c.req.valid("param")
            if (!id) {
                return c.json({error: "Bad request, messing id"}, 400)
            }

            const data  = await db
                .delete(requests)
                .where(
                    and(
                        eq(requests.userId, user?.id),
                        eq(requests.id, id)
                    )
                )
                .returning({
                    id: requests.id
                });

            if (!data) {
                return c.json({error: "Not found,"}, 404)
            }    
            return c.json({data})
    })


export default app