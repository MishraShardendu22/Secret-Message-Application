import NextAuth from 'next-auth/next';
import { authOptions } from './options';


const handler = NextAuth(authOptions);

// export default handler;
// we have to write verbs cause framework
export { handler as GET, handler as POST };