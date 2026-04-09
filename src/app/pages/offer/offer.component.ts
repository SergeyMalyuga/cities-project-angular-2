import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Offer} from '../../core/models/offers';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, EMPTY, filter, map, switchMap} from 'rxjs';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TitleCasePipe} from '@angular/common';
import {ReviewsComponent} from '../../features/reviews/reviews.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  imports: [HeaderComponent, TitleCasePipe, ReviewsComponent],
})
export class OfferComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private offerService = inject(OfferService);
  private destroyRef = inject(DestroyRef);

  public offer = signal<Offer | null>(null);
  public offerId = signal<string | null>(null);

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map(params =>
        params.get('id')),
      filter((id): id is string => id !== null),
      switchMap((id) => {
        const offers$ = this.offerService.getOfferById(id).pipe(catchError(() => {
          this.router.navigate(['/', '**']);
          return EMPTY;
        }));
        return combineLatest({offer: offers$})
      })).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
        this.offer.set(result.offer);
        this.offerId.set(result.offer.id);
      }
    );
  }

  protected readonly Math = Math;
}
