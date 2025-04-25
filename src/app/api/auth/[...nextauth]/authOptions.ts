import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import userModel from "@/models/user.model";
import dbConnect from "@/lib/DbConnect";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await userModel.findOne({ email: credentials?.email });
        if (!user) return null;
        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordCorrect) return null;
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
