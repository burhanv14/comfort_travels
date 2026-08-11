import { api } from '@/lib/api/client';

export const getFeaturedDestinations = () =>
  api.get('/destinations/featured').then(r => r.data);

export const getPopularPackages = () =>
  api.get('/packages/popular').then(r => r.data);

export const getTestimonials = () =>
  api.get('/testimonials').then(r => r.data);