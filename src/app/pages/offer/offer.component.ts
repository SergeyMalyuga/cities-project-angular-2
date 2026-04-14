import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Offer, OfferPreview} from '../../core/models/offers';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, distinctUntilChanged, EMPTY, filter, map, merge, of, Subject, switchMap} from 'rxjs';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SlicePipe, TitleCasePipe} from '@angular/common';
import {ReviewsComponent} from '../../features/reviews/reviews.component';
import {ReviewsService} from '../../core/services/comment.service';
import {Comment} from '../../core/models/comments';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {MapComponent} from '../../shared/components/map/map.component';
import {DEFAULT_CITY} from '../../core/constants/const';
import {NewComment} from '../../core/models/new-comment';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  imports: [HeaderComponent, TitleCasePipe, ReviewsComponent, OfferCardComponent, SlicePipe, MapComponent],
})
export class OfferComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private offerService = inject(OfferService);
  private reviewsService = inject(ReviewsService)
  private refreshReviews$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);

  public offer = signal<Offer | null>(null);
  public neighborOffers = signal<OfferPreview[]>([]);
  public offerId = signal<string | null>(null);
  public comments = signal<Comment[]>([]);
  public readonly Math = Math;
  public readonly DEFAULT_CITY = DEFAULT_CITY;

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map(params =>
        params.get('id')),
      filter((id): id is string => id !== null),
      switchMap((id) => {
        const offers$ = this.offerService.getOfferById(id).pipe(catchError(() => {
          this.router.navigate(['/', '**']);
          return EMPTY;
        }));
        const comments$ = merge(
          this.reviewsService.getComments(id),
          this.refreshReviews$.pipe(switchMap(() => this.reviewsService.getComments(id)))
            .pipe(
              distinctUntilChanged(
                (prev, curr) =>
                  prev.length === curr.length &&
                  prev.every((comment, index) => comment.id === curr[index].id),
              ),
              catchError(() => of([])),
            )
        );
        const neighborOffers$ = this.offerService.getNearbyOffers(id).pipe(catchError(() => of([])));
        return combineLatest({offer: offers$, comments: comments$, neighborOffers: neighborOffers$});
      })).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
        this.offer.set(result.offer);
        this.offerId.set(result.offer.id);
        this.comments.set(result.comments);
        this.neighborOffers.set(result.neighborOffers);
      }
    );
  }

  public postComment(comment: NewComment) {
    const id = this.offerId();
    if (id) {
      this.reviewsService.postComment(comment.comment, Number(comment.rating), id).subscribe(() => this.refreshReviews$.next());
    }
  }
}
