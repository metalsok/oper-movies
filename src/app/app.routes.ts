import { CategoryGuard } from './services/guards/category.guard';
import { Routes } from '@angular/router';
import { MediaDetailsResolver } from './services/resolvers/media-details.resolver';
import { MEDIA_DETAILS } from './constants/constants';

export const routes: Routes = [
  {
    path: ':category',
    loadComponent: () =>
      import('./components/media/media.component').then(
        (m) => m.MediaComponent,
      ),
    canActivate: [CategoryGuard],
  },
  {
    path: ':category/:details/:id',
    loadComponent: () =>
      import('./components/media-details/media-details.component').then(
        (m) => m.MediaDetailsComponent,
      ),
    resolve: {
      [MEDIA_DETAILS]: MediaDetailsResolver,
    },
    canActivate: [CategoryGuard],
  },
  {
    path: '**',
    redirectTo: '/tv',
  },
];
