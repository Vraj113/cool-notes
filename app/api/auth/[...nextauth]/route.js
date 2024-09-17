import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  jwt: {
    async encode({ secret, token }) {
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      return jwt.verify(token, secret);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
