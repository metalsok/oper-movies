import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadMedia, loadMediaFailure, loadMediaSuccess } from './media.actions';
import { TmdbService } from '../../services/tmdb.service';
import { Media } from '../../models/media.interface';
import { Category } from '../../enums/category.enum';

@Injectable()
export class MediaEffects {
  actions$ = inject(Actions);
  tmdbService = inject(TmdbService);

  loadMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMedia),
      mergeMap(({ category, page, query = '' }) => {
        return this.getMediaService(category, page, query).pipe(
          map((response) =>
            loadMediaSuccess({
              results: response.results,
              total_pages: response.total_pages,
              total_results: response.total_results,
              page: response.page,
            }),
          ),
          catchError((error) => {
            return of(loadMediaFailure({ error: error.message }));
          }),
        );
      }),
    ),
  );

  // Select the appropriate service based on the query
  private getMediaService(category: Category, page: number, query: string) {
    return query === ''
      ? this.tmdbService.getTopRated<Media>(category, page)
      : this.tmdbService.search<Media>(category, page, query);
  }
}
