import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TmdbResponse } from '../models/response.interface';
import { Category } from '../enums/category.enum';
import { ENVIRONMENT } from './tokens/environment.token';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private apiUrl = inject(ENVIRONMENT).apiUrl;
  private http = inject(HttpClient);

  getTopRated<T>(
    category: Category,
    page: number,
  ): Observable<TmdbResponse<T>> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    return this.http.get<TmdbResponse<T>>(
      `${this.apiUrl}/${category}/top_rated`,
      { params },
    );
  }

  search<T>(
    category: Category,
    page: number,
    query: string,
  ): Observable<TmdbResponse<T>> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('query', query);

    return this.http.get<TmdbResponse<T>>(`${this.apiUrl}/search/${category}`, {
      params,
    });
  }

  getDetails<T>(category: Category, id: string): Observable<T> {
    const detailType = category === Category.Movie ? 'movie' : 'tv';
    return this.http.get<T>(`${this.apiUrl}/${detailType}/${id}`);
  }
}
