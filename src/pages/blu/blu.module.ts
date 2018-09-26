import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BluPage } from './blu';

@NgModule({
  declarations: [
    BluPage,
  ],
  imports: [
    IonicPageModule.forChild(BluPage),
  ],
})
export class BluPageModule {}
