import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearMedia, loadMedia } from '../../store/media/media.actions';
import {
  MediaState,
  mediaStateFeature,
  selectResponse,
} from '../../store/media/media.state';
import { AsyncPipe } from '@angular/common';
import { MediaListComponent } from '../media-list/media-list.component';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  standalone: true,
  imports: [AsyncPipe, MediaListComponent],
})
export class MediaComponent implements OnInit {
  private store = inject(Store<MediaState>);
  private route = inject(ActivatedRoute);
  private destroyRef$ = inject(DestroyRef);

  public category$ = this.route.params.pipe(map(({ category }) => category));
  private query = '';

  public response$ = this.store.select(selectResponse);
  private query$ = this.store.select(mediaStateFeature.selectQuery);
  public loading$ = this.store.select(mediaStateFeature.selectLoading);
  public error$ = this.store.select(mediaStateFeature.selectError);

  ngOnInit(): void {
    this.category$
      .pipe(
        switchMap((category) => {
          this.store.dispatch(clearMedia());
          return this.query$.pipe(map((query) => ({ category, query })));
        }),
        takeUntilDestroyed(this.destroyRef$),
      )
      .subscribe(({ category, query }) => {
        this.scrollToTop();
        this.query = query;
        this.store.dispatch(
          loadMedia({
            category,
            page: 1,
            query,
          }),
        );
      });
  }

  loadNextPage(page: number) {
    const { category } = this.route.snapshot.params;
    this.store.dispatch(
      loadMedia({
        query: this.query,
        page: page,
        category,
      }),
    );
  }

  scrollToTop() {
    const container = document.querySelector('#scrollable-container');
    if (container) {
      container.scrollTop = 0;
    }
  }
}
