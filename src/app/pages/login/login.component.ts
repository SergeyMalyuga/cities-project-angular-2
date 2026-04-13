import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Credentials} from '../../core/models/credentials';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {filter, take} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {loadOffers} from '../../store/offer/actions/offer.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  public readonly AppRoute = AppRoute;
  public loginGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$')]],
  });

  public ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(
      filter(status => status === AuthorizationStatus.AUTH),
      take(1),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      this.loginGroup.reset();
      this.store.dispatch(loadOffers());
      this.router.navigate([AppRoute.MAIN]);
    })
  }

  public onSubmit() {
    if (this.loginGroup.valid) {
      const {email, password} = this.loginGroup.value;
      const credentials: Credentials = {email, password};
      this.store.dispatch(login({credentials}));
    }
  }
}
