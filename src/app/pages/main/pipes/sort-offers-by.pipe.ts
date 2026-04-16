import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {SortType} from '../../../core/constants/const';

@Pipe({
  name: 'sortOffersBy',
})
export class SortOffersByPipe implements PipeTransform {
  transform(offers: OfferPreview[] | undefined, sortType: SortType) {
    if (!offers || !sortType) {
      return [];
    }

    const sortOffers = [...offers];
    switch (sortType) {
      case SortType.PRICE_LOW_TO_HIGH: {
        return sortOffers.sort((a, b) => a.price - b.price);
      }
      case SortType.PRICE_HIGH_TO_LOW: {
        return sortOffers.sort((a, b) => b.price - a.price);
      }
      case SortType.TOP_RATED_FIRST: {
        return sortOffers.sort((a, b) => b.rating - a.rating);
      }
      default: {
        return sortOffers;
      }
    }
  }
}
