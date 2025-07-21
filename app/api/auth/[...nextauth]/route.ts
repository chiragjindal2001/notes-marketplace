import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { apiClient } from "@/lib/api-client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

interface TokenData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn Callback', { user, account, profile });
      
      if (account?.provider === 'google' && account?.access_token) {
        try {
          // Call backend to exchange Google token for JWT
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: account.id_token,
              access_token: account.access_token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
              },
            }),
          });

          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Backend authentication failed:', error);
            return false;
          }

          const data = await response.json() as TokenData;
          
          // Store tokens in the API client
          apiClient.setTokens(data.accessToken, data.refreshToken);
          
          // Update user data
          user.id = data.user.id;
          user.name = data.user.name || user.name;
          user.email = data.user.email || user.email;
          user.image = data.user.image || user.image;
          
          return true;
        } catch (error) {
          console.error('Error during sign in:', error);
          return false;
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string | null | undefined;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      console.log('Redirect Callback', { url, baseUrl });
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch (e) {
        // Invalid URL, return baseUrl
        return baseUrl;
      }
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  events: {
    async signIn(message) {
      console.log('SignIn Event:', message);
    },
    async signOut() {
      console.log('SignOut Event');
      await apiClient.clearAuth();
    },
    async session(message) {
      console.log('Session Event:', message);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
