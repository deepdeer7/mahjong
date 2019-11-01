import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Subject, of } from 'rxjs';
import { filter, delay, takeUntil } from 'rxjs/operators';
import { CardService } from '../../services/card.service';
import { Card } from '../../domain/card';
import { SHOW_ALL_CARDS_DELAY } from '../../config/constants';

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
        animate('4s')
      ])
    ]),
  ]]
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() public data: Card;
  public isVisible = true;
  private destroySubject = new Subject<void>();

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.cardService.cardHidden$
      .pipe(
        filter((ids: number[]) => ids.includes(this.data.id)),
        delay(50),
        takeUntil(this.destroySubject)
      ).subscribe(() => {
        this.setVisibility(false);
    });
    this.hideCards();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private hideCards(): void {
    of(true).pipe(
    delay(SHOW_ALL_CARDS_DELAY))
    .subscribe(() => {
      this.setVisibility(false);
    });
  }

  public setVisibility(value: boolean): void {
    this.isVisible = value;
  }

  public show(): void {
    if (!this.isVisible) {
      this.setVisibility(true);
      this.cardService.compareCard(this.data);
    }
  }
}
