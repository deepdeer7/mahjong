import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MahjongComponent } from './mahjong/mahjong.component';
import { CardComponent } from './mahjong/components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    MahjongComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
