import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {SortedFavoriteOffers} from '../../core/models/sorted-favorite-offers';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectFavoriteOffers} from '../../store/favorite-offer/selectors/favorite-offer.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [HeaderComponent, OfferCardComponent, RouterLink, TitleCasePipe],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  public sortedFavoriteOffers = signal<SortedFavoriteOffers>(this.getSortedOffers());
  public totalFavorites = computed(() => Object.values(this.sortedFavoriteOffers()).reduce((total, current) => total + current.length, 0));

  public ngOnInit(): void {
    this.store.select(selectFavoriteOffers).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(offers => {
          const sortedOffers = this.getSortedOffers();
          offers.forEach(offer => {
            const key = offer.city.name.toLowerCase();
            if (this.isKeyOfSortedFavoriteOffers(key)) {
              sortedOffers[key].push(offer);
            }
          })
          this.sortedFavoriteOffers.set(sortedOffers);
        }
      )
    ;
  }

  private getSortedOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: []
    }
  }

  public isKeyOfSortedFavoriteOffers(value: string): value is keyof SortedFavoriteOffers {
    return value in this.sortedFavoriteOffers();
  }

  protected readonly Object = Object;
  protected readonly AppRoute = AppRoute;
}
