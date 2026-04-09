import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/comments';
import {APIRoute, BASE_URL} from '../constants/const';
import {defaultHttpPipe} from '../../utils/rxjs-operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private http = inject(HttpClient);

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${BASE_URL}/${APIRoute.COMMENTS}`).pipe(...defaultHttpPipe<Comment[]>());
  }

  public postComment(comment: string, rating: number): Observable<Comment> {
    return this.http.post<Comment>(`${BASE_URL}/${APIRoute.COMMENTS}`, {
      comment,
      rating
    }).pipe(...defaultHttpPipe<Comment>());
  }
}
