import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Category } from '../../enums/category.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CATEGORY_PARAM } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CategoryGuard implements CanActivate {
  validTypes = Object.values(Category) as string[];
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const category = route.params[CATEGORY_PARAM];
    if (!this.validTypes.includes(category!)) {
      this.snackBar.open(
        'Route does not exist!. Redirecting to previous page..',
        '',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        },
      );
      const previousUrl =
        this.router
          .getCurrentNavigation()
          ?.previousNavigation?.finalUrl?.toString() || '/';
      this.router.navigateByUrl(previousUrl);
      return false;
    } else {
      return true;
    }
  }
}
