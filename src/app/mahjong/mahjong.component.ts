import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardService } from './services/card.service';
import { ArrayHelper } from './helpers/array.helper';
import { PRIME_NUMBERS } from './config/constants';
import { Card } from './domain/card';

@Component({
  selector: 'app-mahjong',
  templateUrl: './mahjong.component.html',
  styleUrls: ['./mahjong.component.css']
})
export class MahjongComponent implements OnInit, OnDestroy {
  public primeNumbers: number[];
  private previousCard: Card;
  private currentCard: Card;
  private destroySubject = new Subject<void>();

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.primeNumbers = this.getDoubledShuffledPrimeNumbers();

    this.cardService.cardCompared$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((card: Card) => {
        this.updateCards(card);
    });
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private getDoubledShuffledPrimeNumbers(): number[] {
    const doublePrimeNumbers = ArrayHelper.double(PRIME_NUMBERS);
    return ArrayHelper.shuffle(doublePrimeNumbers);
  }

  private updateCards(card: Card): void {
    if (!this.previousCard) {
      this.previousCard = card;
    } else {
      this.currentCard = card;
      this.compareCards();
      this.previousCard = null;
    }
  }

  private compareCards(): void {
    if (this.previousCard.value !== this.currentCard.value) {
      this.cardService.hideCards([this.previousCard.id, this.currentCard.id]);
    }
  }
}
