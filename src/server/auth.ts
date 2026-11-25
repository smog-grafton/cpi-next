import "server-only";

import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { AdminRole } from "@/domain/models";
import { getDatabase, hasDatabaseConfiguration } from "@/server/db/client";
import { users } from "@/server/db/schema";

const credentialsSchema = z.object({
  email: z.email().max(191).transform((value) => value.toLocaleLowerCase()),
  password: z.string().min(8).max(256),
});

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "CPMI administrator",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success || !hasDatabaseConfiguration()) return null;

        const [account] = await getDatabase()
          .select()
          .from(users)
          .where(eq(users.email, parsed.data.email))
          .limit(1);
        if (!account?.active) return null;
        if (!(await compare(parsed.data.password, account.passwordHash))) return null;

        return {
          id: account.id,
          email: account.email,
          name: account.name,
          role: account.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getAdminSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}

const rolePermissions: Record<AdminRole, AdminRole[]> = {
  CONTENT_EDITOR: ["CONTENT_EDITOR"],
  FINANCE_REVIEWER: ["FINANCE_REVIEWER"],
  MINISTRY_ADMIN: ["CONTENT_EDITOR", "MINISTRY_ADMIN"],
  SUPER_ADMIN: [
    "CONTENT_EDITOR",
    "FINANCE_REVIEWER",
    "MINISTRY_ADMIN",
    "SUPER_ADMIN",
  ],
};

export function hasRole(session: Session | null, required: AdminRole): boolean {
  return Boolean(session?.user?.role && rolePermissions[session.user.role].includes(required));
}

export async function requireAdminRole(required: AdminRole): Promise<Session> {
  const session = await getAdminSession();
  if (!session?.user) redirect(`/admin/login?callbackUrl=${encodeURIComponent("/admin")}`);
  if (!hasRole(session, required)) redirect("/admin/forbidden");
  return session;
}
