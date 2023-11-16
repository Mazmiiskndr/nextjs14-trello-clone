import { db } from "@/libs/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  //   session: {
  //     strategy: "jwt",
  //   },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account && profile && account.provider === "google") {
    //     const existingUser = await prisma.user.findUnique({
    //       where: { email: profile.email },
    //     });
    //     if (existingUser) {
    //       console.log("User already exists", existingUser);
    //     } else {
    //       const newUser = await prisma.user.create({
    //         data: {
    //           email: profile.email,
    //           name: profile.name,
    //           image: profile.image,
    //           password: "",
    //         },
    //       });
    //       console.log("New user created", newUser);
    //     }
    //   }
    //   return profile !== null;
    // },

    async signIn({ user, account, profile }) {
      console.log("user: ", user);
      console.log("account: ", account);
      console.log(profile);
      return true;
    },

    async session({ token, session }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
          username: token.username,
        };
      }

      return session;
    },

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      // console.log("in jwt",token)
      return token;
    },
    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
