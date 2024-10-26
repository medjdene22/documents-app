import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { publicRoutes, authRoutes, apiAuthPrefix, DEFAUT_LOGIN_REDIRECT } from "./route";
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isLogedIn = !!req.auth

    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(pathname)
    const isAuthRoute = authRoutes.includes(pathname)

    if (isApiAuthRoute) return 

    if (isAuthRoute) {
        if (isLogedIn) return Response.redirect(new URL(DEFAUT_LOGIN_REDIRECT, req.nextUrl))
        
        return
    }
    
    if (!isPublicRoute && !isLogedIn) return Response.redirect(new URL("/", req.nextUrl))

    return
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };