import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../enums/category.enum';
import { TmdbService } from '../tmdb.service';
import { MediaDetails } from '../../models/media-details.interface';
import { CATEGORY_PARAM, ID_PARAM } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class MediaDetailsResolver implements Resolve<MediaDetails | null> {
  private tmdbService = inject(TmdbService);

  resolve(route: ActivatedRouteSnapshot): Observable<MediaDetails | null> {
    const category = route.params[CATEGORY_PARAM]! as Category;
    const id = route.params[ID_PARAM]!;
    return this.tmdbService.getDetails<MediaDetails>(category, id);
  }
}
