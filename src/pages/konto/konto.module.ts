import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KontoPage, } from './konto';

@NgModule({
  declarations: [
    KontoPage,,
  ],
  imports: [
    IonicPageModule.forChild(KontoPage,),
  ],
})
export class KontoPageModule {}
