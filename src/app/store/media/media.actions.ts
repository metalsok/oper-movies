import { createAction, props } from '@ngrx/store';
import { Media } from '../../models/media.interface';
import { Category } from '../../enums/category.enum';

export const loadMedia = createAction(
  '[Media] Load Media',
  props<{ category: Category; page: number; query?: string }>(), // Add `query` as an optional parameter
);

export const loadMediaSuccess = createAction(
  '[Media] Load Media Success',
  props<{
    results: Media[];
    total_pages: number;
    total_results: number;
    page: number;
  }>(),
);

export const loadMediaFailure = createAction(
  '[Media] Load Media Failure',
  props<{ error: string }>(),
);
export const updateQuery = createAction(
  '[Media] Update Query',
  props<{ query: string }>(),
);

export const clearMedia = createAction('[Media] Reset Media');
