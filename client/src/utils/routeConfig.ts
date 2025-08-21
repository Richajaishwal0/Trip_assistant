import React from 'react';
import { lazyLoad } from './lazyLoadUtils';

// Define route configurations for better organization and prefetching
export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  prefetch?: boolean;
}

// Import path mappings for preloading
const componentPaths: Record<string, () => Promise<any>> = {
  '/': () => import('../pages/home'),
  '/places': () => import('../pages/Places'),
  '/find-friends': () => import('../pages/FindFriends'),
  '/auth': () => import('../pages/Auth'),
  '/admin': () => import('../pages/Admin/admin'),
  '/more-places': () => import('../pages/MorePlaces'),
  '/places/:placeName': () => import('../pages/PlaceDetails'),
  '/help': () => import('../pages/HelpCentre'),
  '/trip-budget': () => import('../components/TripBudgetEstimator'),
  '/budget-planner': () => import('../pages/BudgetPlannerPage'),
  '/about': () => import('../components/AboutUsPage'),
};

// Define all app routes with lazy loading
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazyLoad(componentPaths['/']),
    prefetch: true, // Prefetch this component since it's the landing page
  },
  {
    path: '/places',
    component: lazyLoad(componentPaths['/places']),
    prefetch: true, // Frequently used route
  },
  {
    path: '/find-friends',
    component: lazyLoad(componentPaths['/find-friends']),
  },
  {
    path: '/auth',
    component: lazyLoad(componentPaths['/auth']),
    prefetch: true, // Authentication is critical
  },
  {
    path: '/admin',
    component: lazyLoad(componentPaths['/admin']),
  },
  {
    path: '/more-places',
    component: lazyLoad(componentPaths['/more-places']),
  },
  {
    path: '/places/:placeName',
    component: lazyLoad(componentPaths['/places/:placeName']),
  },
  {
    path: '/help',
    component: lazyLoad(componentPaths['/help']),
  },
  {
    path: '/trip-budget',
    component: lazyLoad(componentPaths['/trip-budget']),
  },
  {
    path: '/budget-planner',
    component: lazyLoad(componentPaths['/budget-planner']),
  },
  {
    path: '/about',
    component: lazyLoad(componentPaths['/about']),
  },
];

// Function to prefetch critical routes
export function prefetchCriticalRoutes() {
  routes
    .filter(route => route.prefetch)
    .forEach(route => {
      // Start loading the component in the background
      const importFunc = componentPaths[route.path];
      if (importFunc) {
        // Trigger the import but don't wait for it
        importFunc();
        console.log(`Prefetching route: ${route.path}`);
      }
    });
}
