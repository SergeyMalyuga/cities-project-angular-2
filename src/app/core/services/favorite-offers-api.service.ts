import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offer, OfferPreview} from '../models/offers';
import {APIRoute, BASE_URL, FavoriteStatus} from '../constants/const';
import {defaultHttpPipe} from '../../utils/rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOffersApiService {
  private http = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http
      .get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`)
      .pipe(...defaultHttpPipe<OfferPreview[]>());
  }

  public toggleFavorite(
    offerId: string,
    isFavorite: boolean,
  ): Observable<Offer> {
    const statusValue = isFavorite
      ? FavoriteStatus.ADDED
      : FavoriteStatus.REMOVED;
    return this.http
      .post<Offer>(
        `${BASE_URL}/${APIRoute.FAVORITE}/${offerId}/${statusValue}`,
        {},
      )
      .pipe(...defaultHttpPipe<Offer>());
  }
}
