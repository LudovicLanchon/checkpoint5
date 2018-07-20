import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Rabbit } from '../shared/models/rabbit.model';

@Injectable()
export class RabbitService {

  constructor(private http: HttpClient) { }

  getRabbits(): Observable<Rabbit[]> {
    return this.http.get<Rabbit[]>('/api/rabbits');
  }

  countRabbits(): Observable<number> {
    return this.http.get<number>('/api/rabbits/count');
  }

  addRabbit(rabbit: Rabbit): Observable<Rabbit> {
    return this.http.post<Rabbit>('/api/rabbit', rabbit);
  }

  getRabbit(rabbit: Rabbit): Observable<Rabbit> {
    return this.http.get<Rabbit>(`/api/rabbit/${rabbit._id}`);
  }

  editRabbit(rabbit: Rabbit): Observable<string> {
    return this.http.put(`/api/rabbit/${rabbit._id}`, rabbit, { responseType: 'text' });
  }

  deleteRabbit(rabbit: Rabbit): Observable<string> {
    return this.http.delete(`/api/rabbit/${rabbit._id}`, { responseType: 'text' });
  }

}
