import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
//import { getUserProfile } from './apiService';

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get('jwtToken')?.value;

  if (!jwtToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const decodedToken = jwtDecode<{ id: string; exp: number }>(jwtToken);
    const now = Date.now() / 1000;

    if (decodedToken.exp < now) {
      return NextResponse.redirect(new URL('/', request.url));
    }
/*
    const userId = decodedToken.id;
    const userResponse = await getUserProfile(userId);


    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    if (isDashboardRoute && !userResponse.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  */
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/wizard/:path*', 
    '/edit-profile',
    '/profile',
    '/teacher-dashboard',
    '/quiz/:courseId/:lectureId', 
    '/dashboard/:path*', 
  ],
};
