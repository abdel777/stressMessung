import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TippsPage } from './tipps';

@NgModule({
  declarations: [
    TippsPage,
  ],
  imports: [
    IonicPageModule.forChild(TippsPage),
  ],
})
export class TippsPageModule {}
