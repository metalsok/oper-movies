import {
  AfterViewInit,
  DestroyRef,
  Directive,
  inject,
  input,
  output,
} from '@angular/core';
import { auditTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  standalone: true,
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements AfterViewInit {
  scrollableContainerSelector = input.required<string>();
  scrolled = output<void>();
  throttleTime = input<number>(150);
  scrollThreshold = input<number>(200);

  private destroyRef$ = inject(DestroyRef);
  private scrollableContainer: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.scrollableContainer = document.querySelector(
      this.scrollableContainerSelector(),
    );
    if (!this.scrollableContainer) {
      console.error(
        `No element found with selector: ${this.scrollableContainerSelector}`,
      );
      return;
    }

    fromEvent(this.scrollableContainer, 'scroll')
      .pipe(
        auditTime(this.throttleTime()),
        takeUntilDestroyed(this.destroyRef$),
      )
      .subscribe(() => this.checkScroll());
  }

  private checkScroll(): void {
    if (!this.scrollableContainer) return;

    const scrollTop = this.scrollableContainer.scrollTop;
    const clientHeight = this.scrollableContainer.clientHeight;
    const scrollHeight = this.scrollableContainer.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - this.scrollThreshold()) {
      this.scrolled.emit();
    }
  }
}
