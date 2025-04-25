import NextAuth from 'next-auth';
import { authOptions } from './authOptions';


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const dynamic = 'force-dynamic'; // This is required to prevent caching issues with NextAuth
export const revalidate = 0; // This is required to prevent caching issues with NextAuth