import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comments';
import { APIRoute, BASE_URL } from '../constants/const';
import { defaultHttpPipe } from '../../utils/rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private http = inject(HttpClient);

  public getComments(offerId: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`)
      .pipe(...defaultHttpPipe<Comment[]>());
  }

  public postComment(
    comment: string,
    rating: number,
    offerId: string,
  ): Observable<Comment> {
    return this.http
      .post<Comment>(`${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`, {
        comment,
        rating,
      })
      .pipe(...defaultHttpPipe<Comment>());
  }
}
