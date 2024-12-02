import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { updateQuery } from './store/media/media.actions';
import { Store } from '@ngrx/store';
import { MediaState } from './store/media/media.state';
import { Category } from './enums/category.enum';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { DEBOUNCE_TIME, MIN_QUERY_LENGTH } from './constants/constants';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatInput } from '@angular/material/input';
import { ThemeService } from './services/theme.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatFormField,
    MatTabGroup,
    MatTab,
    MatInput,
    MatLabel,
    MatSlideToggle,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private destroyRef$ = inject(DestroyRef);
  private store = inject(Store<MediaState>);
  private themeService = inject(ThemeService);
  public selectedTab = 1;
  public searchControl = new FormControl(); // Fixed generic type
  public theme = this.themeService.getCurrentTheme();

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.handleQueryChanges();
    this.handleRouteChanges();
  }

  onTabChange(index: number) {
    const category = Object.values(Category)[index] as Category;
    this.router.navigate([`/${category}`]);
  }

  private handleRouteChanges() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.selectedTab = this.router.url.includes(Category.Movie) ? 0 : 1;
        }
      });
  }

  private handleQueryChanges() {
    this.searchControl.valueChanges
      .pipe(
        filter(
          (query) => query === '' || query.trim().length > MIN_QUERY_LENGTH,
        ),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef$),
      )
      .subscribe((query: string) => {
        this.store.dispatch(updateQuery({ query }));
      });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
