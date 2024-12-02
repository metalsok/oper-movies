import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Media } from '../../models/media.interface';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-item',
  imports: [DatePipe],
  templateUrl: './media-item.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemComponent {
  item = input.required<Media>();
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  navigateToDetails() {
    this.router.navigate(['details', this.item().id], {
      relativeTo: this.route,
    });
  }
}
