import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      name?: string;
    };
    expires?: string;
    userRole?: string;
    userId?: number;
    userName?: string;
  }

  import { JWT } from "next-auth/jwt";

  declare module "next-auth/jwt" {
    interface JWT {
      role?: string;
      id?: number;
      name?: string;
    }
  }
}
