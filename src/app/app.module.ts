import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { LottieAnimationViewModule } from 'lottie-angular2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationProvider } from '../providers/location/location';
import { HeartRateProvider } from '../providers/heart-rate/heart-rate';
import { DayEventProvider } from '../providers/day-event/day-event';
import { NoiseLevelProvider } from '../providers/noise-level/noise-level';
import { PeopleAroundProvider } from '../providers/people-around/people-around';
import { PhoneStateProvider } from '../providers/phone-state/phone-state';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HttpModule } from '@angular/http';
import { BLE } from '@ionic-native/ble';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import {File, FileEntry} from '@ionic-native/file';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Calendar } from '@ionic-native/calendar';
import { DBMeter } from '@ionic-native/db-meter';
import { SQLite } from '@ionic-native/sqlite';




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HeartratePage } from '../pages/heartrate/heartrate';
import { EinstellungPage } from '../pages/einstellung/einstellung';
import { KontoPage } from '../pages/konto/konto';
import { AboutPage } from '../pages/about/about';
import { TippsPage } from '../pages/tipps/tipps';
import { InfoPage } from '../pages/info/info';
import { BluetouthPage } from '../pages/bluetouth/bluetouth';
import { ApiPage } from '../pages/api/api';
import { ApiinformationPage } from '../pages/apiinformation/apiinformation';
import { SlidersPage } from '../pages/sliders/sliders';

 import { MidelwareProvider } from '../providers/midelware/midelware';
 import { IonicStorageModule } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SqliteservicesProvider } from '../providers/sqliteservices/sqliteservices';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    HeartratePage,
    EinstellungPage,
    KontoPage,
    AboutPage,
    TippsPage,
    InfoPage,
    BluetouthPage,
    ApiPage,
    ApiinformationPage,
    SlidersPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    LottieAnimationViewModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    HeartratePage,
    EinstellungPage,
    KontoPage,
    AboutPage,
    TippsPage,
    InfoPage,
    BluetouthPage,
    ApiPage,
    ApiinformationPage,
    SlidersPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider,
    HeartRateProvider,
    DayEventProvider,
    NoiseLevelProvider,
    PeopleAroundProvider,
    PhoneStateProvider,
    Diagnostic,
    BLE,
    Hotspot,
    File,
    Calendar,
    DBMeter,
    MidelwareProvider,
    AuthServiceProvider,
    SQLite,
    SqliteservicesProvider,
    SqliteservicesProvider,
  ]
})
export class AppModule {}
