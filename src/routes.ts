import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home';
import AboutData from './pages/about.data';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/clock',
    component: lazy(() => import('./pages/classic/clock')),
  },
  {
    path: '/chronometer',
    component: lazy(() => import('./pages/classic/chronometer')),
  },
  {
    path: '/workouts/tabata',
    component: lazy(() => import('./pages/workouts/tabata')),
  },
  {
    path: '/workouts/one-minute',
    component: lazy(() => import('./pages/workouts/one-minute')),
  },
  {
    path: '/workouts/10-20-30',
    component: lazy(() => import('./pages/workouts/10-20-30')),
  },
  {
    path: '/workouts/basic',
    component: lazy(() => import('./pages/workouts/basic')),
  },
  {
    path: '/workouts/beginner',
    component: lazy(() => import('./pages/workouts/beginner')),
  },
  {
    path: '/workouts/fat-burner',
    component: lazy(() => import('./pages/workouts/fat-burner')),
  },
  {
    path: '/workouts/go-to',
    component: lazy(() => import('./pages/workouts/go-to')),
  },
  {
    path: '/workouts/midwestern',
    component: lazy(() => import('./pages/workouts/midwestern')),
  },
  {
    path: '/workouts/norwegian',
    component: lazy(() => import('./pages/workouts/norwegian')),
  },
  {
    path: '/workouts/one-by-four',
    component: lazy(() => import('./pages/workouts/one-by-four')),
  },
  {
    path: '/workouts/ten-by-one',
    component: lazy(() => import('./pages/workouts/ten-by-one')),
  },
  {
    path: '/workouts/wingate-classic',
    component: lazy(() => import('./pages/workouts/wingate-classic')),
  },
  {
    path: '/customs/blank',
    component: lazy(() => import('./pages/customs/blank')),
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
    data: AboutData,
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
