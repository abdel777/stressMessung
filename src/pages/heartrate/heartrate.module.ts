import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeartratePage } from './heartrate';

@NgModule({
  declarations: [
    HeartratePage,
  ],
  imports: [
    IonicPageModule.forChild(HeartratePage),
  ],
})
export class HeartratePageModule {}
