import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Media } from '../../models/media.interface';
import { MediaItemComponent } from '../media-item/media-item.component';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { CardSkeletonComponent } from '../card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [
    MatCardModule,
    MediaItemComponent,
    InfiniteScrollDirective,
    CardSkeletonComponent,
  ],
  templateUrl: './media-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class MediaListComponent {
  mediaItems = input.required<Media[]>();
  hasMorePages = input.required<boolean>();
  loading = input<boolean | null>(true);
  error = input<string | null>(null);
  loadNextPage = output();
  isEmpty = computed(() => !this.error() && this.mediaItems().length === 0);

  handleScroll() {
    if (this.hasMorePages()) {
      this.loadNextPage.emit();
    }
  }
}
