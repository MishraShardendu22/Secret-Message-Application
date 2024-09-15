import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  
    // we get token to see if the user is verified or not 
    const token = await getToken({ req: request });

    // current url where the user is standing
    const url = request.nextUrl;

    // Redirect to dashboard if the user is already authenticated
    // and trying to access sign-in, sign-up, or home page
    if ( token && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify')  ||
            url.pathname === '/' )
        ) 
        {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // user is not authenticated and trying to access dashboard
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // middleware uses next() to direct flow to next middleware
    return NextResponse.next();
}

// In backend the middle-ware needs req, res, error, and next (error is optional) here we only give request
// You're correct that in some backend frameworks, like Express.js, middleware functions typically take `req`, `res`, `next`, and sometimes `err` for error handling. In Express, middleware functions generally look like this:

// ```javascript
// function middleware(req, res, next) {
//   // Logic goes here
//   next(); // Move to the next middleware
// }
// ```

// However, **Next.js middleware** works differently. It's not the same as Express-style middleware. In Next.js, the middleware function operates at a lower level and doesn't use `req`, `res`, or `next` like traditional server-side frameworks. Instead, it uses `NextRequest` and `NextResponse`.

// ### For Express.js:
// If you're using **Express.js** or a similar framework, the correct format for middleware should be:

// ```javascript
// function middleware(req, res, next) {
//     try {
//         // Your middleware logic
//         next(); // Call next to proceed
//     } catch (error) {
//         next(error); // Pass error to error-handling middleware
//     }
// }
// ```

// ### For **Next.js Middleware**:
// If you are working with **Next.js** middleware, you should follow its structure. Next.js doesn't pass `req`, `res`, `next`, or `err` directly like Express. Instead, you work with `NextRequest` and `NextResponse`, as shown below:

// ```typescript
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//     // Example: redirect if user is not authenticated
//     const response = NextResponse.next();
    
//     // Return the response (Next.js handles routing for you)
//     return response;
// }
// ```

// ### Summary:

// - **Express.js**: Middleware expects `req`, `res`, `next`, and optionally `error`.
// - **Next.js**: Middleware only takes `NextRequest`, and you handle the response by returning `NextResponse` without `req`, `res`, or `next`.

// Each framework has its own middleware structure, and it’s important to use the correct pattern for each one.