import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Check if the user is authenticated

      // Define your protected paths
      const isProtectedPath =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/meeting") || // <-- ADD THIS LINE
        nextUrl.pathname.startsWith("/meetings"); // <-- AND THIS LINE (if you have both singular/plural)

      const isOnLoginPage = nextUrl.pathname.startsWith("/auth/signin");

      // Scenario 1: User is trying to access a protected path
      if (isProtectedPath) {
        if (isLoggedIn) {
          return true; // Allow access if logged in
        }
        // If not logged in, returning false triggers the `pages.signIn` redirect
        return false;
      }

      // Scenario 2: User is logged in and trying to access the login page
      // In this case, redirect them to the dashboard.
      else if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Scenario 3: All other cases (public pages, or login page if not logged in)
      return true; // Allow access
    },
    // Optional: Add other callbacks like jwt, session if you need to customize token/session data
    // async jwt({ token, user, account, profile }) { /* ... */ return token; },
    // async session({ session, token }) { /* ... */ return session; },
  },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL("/dashboard", nextUrl));
  //     }
  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;
