import NextAuth, {Account, Profile, Session, User} from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import {JWT} from "next-auth/jwt";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID || '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
            issuer: process.env.COGNITO_ISSUER,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }: {
            token: JWT;
            user?: User;
            account?: Account | null;
            profile?: Profile | null;
            isNewUser?: boolean
        }) {
            // console.log("token", token, "user", user, "account", account);
            if (account) {
                console.log("Adding account token to session token");
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("SESSION CALLBACK TRIGGERED");
            console.log("session", session, "token", token);
            return {
                ...session,
                accessToken: token.accessToken
            };
        }
    }
}

export default NextAuth(authOptions)