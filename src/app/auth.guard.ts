import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginComponent } from './Auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn !== true) {
      this.snackBar.open("Crea/accedi all'accunt, per vedere i tuoi To-Do", "Ok", {
        duration: 3000, horizontalPosition: 'left',
      });
      this.router.navigate(["/"]);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "650px";
      dialogConfig.height = "380px"
      dialogConfig.disableClose = true; // l'unico modo per chiudere la finestra di dialogo è tramite 
      dialogConfig.autoFocus = true;
      this.dialog.open(LoginComponent, dialogConfig) // apro il dialog specificando il Component e le configurazioni
    }
    return true;
  }
}
