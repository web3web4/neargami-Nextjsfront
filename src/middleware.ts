import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get('jwtToken')?.value;
  if (!jwtToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const decodedToken = jwtDecode<{ exp: number }>(jwtToken);
    const now = Date.now() / 1000;

    if (decodedToken.exp < now) {
      return NextResponse.redirect(new URL("/", request.url)); 
    }
  } catch (error) {
    console.log("Error middelware",error);
    return NextResponse.redirect(new URL("/", request.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/wizard/:path*',  //  Any sub-route within /wizard don't work
    //'/profile/:path*',  // only this path without sub-route...  example /profile/game this work ,  or /profile  don't work
    '/edit-profile',
    '/profile',
    '/teacher-dashboard',
    '/quiz/:courseId/:lectureId',  // dynamic route
  ], 
};
