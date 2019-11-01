import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Subject, of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { CardService } from '../../services/card.service';
import { Card } from '../../domain/card';
import { SHOW_ALL_CARDS_DELAY, DISABLED_CARD_DELAY } from '../../config/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [[
    trigger('visibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible => invisible', [
        animate('2s')
      ])
    ]),
    trigger('card', [
      state('active', style({
        boxShadow: '0 0 8px rgba(154, 18, 179,0.6)'
      })),
      state('disabled', style({
        boxShadow: '0 0 8px rgba(0,0,0,0.5)'
      })),
      transition('disabled <=> active', [
        animate('2s')
      ])
    ]),
  ]]
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() public data: Card;
  public isVisible = true;
  public isDisabled = true;
  private destroySubject = new Subject<void>();

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.cardService.cardHidden$
      .pipe(
        delay(50),
        takeUntil(this.destroySubject)
      ).subscribe((ids: number[]) => {
        if (this.isCardNeededToHide(ids)) {
          this.setVisibility(false);
        } else {
          this.setDisability(true);
          this.disableCardForTwoSeconds();
        }
    });
    this.hideCards();
  }

  private isCardNeededToHide(ids: number[]): boolean {
    return ids.includes(this.data.id);
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private disableCardForTwoSeconds(): void {
    of(true).pipe(
    delay(DISABLED_CARD_DELAY))
    .subscribe(() => {
      this.setDisability(false);
    });
  }

  private setDisability(value: boolean): void {
    this.isDisabled = value;
  }

  private hideCards(): void {
    of(true).pipe(
    delay(SHOW_ALL_CARDS_DELAY))
    .subscribe(() => {
      this.setVisibility(false);
      this.disableCardForTwoSeconds();
    });
  }

  public setVisibility(value: boolean): void {
    this.isVisible = value;
  }

  public show(): void {
    if (!this.isVisible && !this.isDisabled) {
      this.setVisibility(true);
      this.cardService.compareCard(this.data);
    }
  }
}
