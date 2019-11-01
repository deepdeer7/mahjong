import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Card } from '../domain/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardComparedSource = new Subject<Card>();
  private cardHiddenSource = new Subject<number[]>();

  public cardCompared$ = this.cardComparedSource.asObservable();
  public cardHidden$ = this.cardHiddenSource.asObservable();
  constructor() {}

  public compareCard(card: Card): void {
    this.cardComparedSource.next(card);
  }

  public hideCards(ids: number[]): void {
    this.cardHiddenSource.next(ids);
  }
}
