import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import departments from './departments'
import specialties from './specialties'
import requests_user from './requests-user'
export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app
    .route("/departments", departments)
    .route("/specialties", specialties)
    .route("/requests", requests_user)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;

