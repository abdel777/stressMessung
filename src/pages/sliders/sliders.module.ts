import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlidersPage } from './sliders';

@NgModule({
  declarations: [
    SlidersPage,
  ],
  imports: [
    IonicPageModule.forChild(SlidersPage),
  ],
})
export class SlidersPageModule {}
