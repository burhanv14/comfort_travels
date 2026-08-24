import { apiClient } from '@/lib/api/client';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export const getFeaturedDestinations = () =>
  apiClient.get('/destinations/featured').then(r => r.data);

export const getPopularPackages = () =>
  apiClient.get('/packages/popular').then(r => r.data);

export const getTestimonials = () =>
  apiClient.get('/testimonials').then(r => r.data);

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: errorResponse('Unauthorized', 401), user: null };
  }
  const token = authHeader.slice(7);
  const user = await verifyToken(token);
  if (!user) {
    return { error: errorResponse('Invalid token', 401), user: null };
  }
  return { error: null, user };
}