import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MediaDetails } from '../../models/media-details.interface';
import { MEDIA_DETAILS } from '../../constants/constants';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-media-details',
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './media-details.component.html',
  standalone: true,
  animations: [
    trigger('landingAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class MediaDetailsComponent {
  private route = inject(ActivatedRoute);
  mediaDetails$: Observable<MediaDetails> = this.route.data.pipe(
    map((res) => res[MEDIA_DETAILS]),
  ) as Observable<MediaDetails>;
}
