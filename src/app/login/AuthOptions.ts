import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usuario: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { usuario, password } = credentials;

        try {
          // Buscar usuario con Prisma
          const user = await prisma.team_member.findFirst({
            where: {
              usuario: usuario,
              fecha_salida: null
            }
          });

          if (!user) {
            throw new Error("Usuario no encontrado");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Credenciales inválidas");
          }

          return {
            id: user.id_member.toString(), // Asegurar que es string
            name: user.nombre,
            role: user.rol,
          };
        } catch (error) {
          console.error("Error en autorización:", error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.userRole = token.role;
        session.userId = token.id;
        session.userName = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};