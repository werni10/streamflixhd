import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const admin = await db.admin.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: admin.id.toString(),
          name: admin.username,
          email: admin.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
