import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EinstellungPage } from './einstellung';

@NgModule({
  declarations: [
    EinstellungPage,
  ],
  imports: [
    IonicPageModule.forChild(EinstellungPage),
  ],
})
export class EinstellungPageModule {}
