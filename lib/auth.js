import NextAuth from 'next-auth';
import Twitter from 'next-auth/providers/twitter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist OAuth tokens to the JWT
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.tokenType = account.token_type;
        // Twitter OAuth 2.0 scopes
        token.scope = account.scope;
      }
      if (profile) {
        token.xHandle = profile.data?.username || profile.screen_name;
        token.xId = profile.data?.id || profile.id_str;
        token.xAvatar = profile.data?.profile_image_url_https || profile.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.xHandle = token.xHandle;
      session.user.xId = token.xId;
      session.user.xAvatar = token.xAvatar;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  trustHost: true,
});
