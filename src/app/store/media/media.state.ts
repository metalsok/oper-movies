import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
  clearMedia,
  loadMedia,
  loadMediaFailure,
  loadMediaSuccess,
  updateQuery,
} from './media.actions';
import { Media } from '../../models/media.interface';
import { TmdbResponse } from '../../models/response.interface';

export interface MediaState extends TmdbResponse<Media> {
  query: string;
  loading: boolean;
  error: string | null;
}

function resetResultsAndPagination(state: MediaState) {
  return {
    ...state,
    loading: true,
    results: [],
    total_pages: 0,
    total_results: 0,
    page: 1,
    error: null,
  };
}

const initialState: MediaState = {
  query: '',
  results: [],
  page: 1,
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
};

const reducer = createReducer(
  initialState,

  on(loadMedia, (state) => ({ ...state, loading: true, error: null })),
  on(
    loadMediaSuccess,
    (state, { results, total_results, total_pages, page }) => ({
      ...state,
      total_pages,
      total_results,
      page,
      results: [...state.results, ...results],
      loading: false,
    }),
  ),
  on(loadMediaFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(updateQuery, (state, { query }) => ({
    ...resetResultsAndPagination(state),
    query,
  })),
  on(clearMedia, (state) => ({
    ...resetResultsAndPagination(state),
  })),
);

export const mediaStateFeature = createFeature({
  name: 'mediaState',
  reducer,
});
export const selectResponse = createSelector(
  mediaStateFeature.selectResults,
  mediaStateFeature.selectPage,
  mediaStateFeature.selectTotal_pages,
  mediaStateFeature.selectTotal_results,
  (results, page, total_pages, total_results) => ({
    results,
    page,
    total_pages,
    total_results,
  }),
);
