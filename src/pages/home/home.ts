import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HeartratePage } from '../heartrate/heartrate';
import { TippsPage } from '../tipps/tipps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayEventProvider } from '../../providers/day-event/day-event';
import { HeartRateProvider } from '../../providers/heart-rate/heart-rate';
import { LocationProvider } from '../../providers/location/location';
import { NoiseLevelProvider } from '../../providers/noise-level/noise-level';
import { PeopleAroundProvider } from '../../providers/people-around/people-around';
import { PhoneStateProvider } from '../../providers/phone-state/phone-state';
import { MidelwareProvider } from '../../providers/midelware/midelware';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SqliteservicesProvider } from '../../providers/sqliteservices/sqliteservices';
import { App, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  charts: string;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  /**
      * @name form
      * @type {FormGroup}
      * @public
      * @description              References a FormGroup object for use
      *                           with form validation/management
      */
  public form: FormGroup;

  /**
  * @name _HOST
  * @type {String}
  * @private
  * @description              The network IP Address and port number that the
                              node application is running on
  */
  private _HOST: string = "https://murmuring-woodland-72589.herokuapp.com/";
  private event: string;
  private phonestate: string;
  loading:any;
  isLoggedIn: boolean =false;
  private _id:any;

  /*Stress Data*/
  private HeartRateTime: any;
  private HeartRate: any;
  private tableheartrate: any[] = [];
  private CurrentEvent: any;
  private PeopleAround: any;
  private NoisLevel: any;
  private Stressed: any;
  private CurrentLocation: any;
  private IsinCall: any;
  private Islocked: any;
  private GeneralTime: any;



  constructor(public navCtrl: NavController,
          public navParams: NavParams,
          public app: App,
          public authService: AuthServiceProvider,
          public loadingCtrl: LoadingController,
          private _FB: FormBuilder,
          private _HTTP: HttpClient,
          private _TOAST: ToastController,
          private _Platform: Platform,
          private _DAYEVENT: DayEventProvider,
          private _LOCATION: LocationProvider,
          private _NOISLEVEL: NoiseLevelProvider,
          private _PHONESTATE: PhoneStateProvider,
          private _HEARTRATE: HeartRateProvider,
          private _MIDELWARE: MidelwareProvider,
        private _sqlite: SqliteservicesProvider) {

      if(localStorage.getItem("username") && localStorage.getItem("_id")){
              this.isLoggedIn =true;
              this._id=localStorage.getItem("_id");
            }
    this.charts = "Tag";

  };
  logout() {
      this.showLoader();
      this.authService.logout().then((result) => {
          this.loading.dismiss();
          let nav = this.app.getRootNav();
          nav.setRoot(LoginPage);
      }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
      });
  }
  showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Login Out.'
        });

        this.loading.present();
    }
    presentToast(msg) {
        let toast = this._TOAST.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

  /**
   * Retrieve the documents from the MongoDB database
   * on the ionViewDidEnter lifecycle event
   *
   * @public
   * @method ionViewDidEnter
   * @return {None}
   */
   getApiDATA(){
    var heartrate = this._MIDELWARE.gethertrate().then((data:any[]) => {
      this.tableheartrate =this._MIDELWARE.rrFilter(data);
    });
   }


  ionViewDidEnter() {
    //setInterval(() => { this.saveStressData(); }, 60000);
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  saveStressData(){
    //TODO in getlocation : check GPS and Wifi is On
    console.log('start save data');
    var _THIS = this;
    var nois = this._NOISLEVEL.getnoislevel().then((data) => {
      this.NoisLevel = data
      console.log('Noislevel out of promise:' + this.NoisLevel);
    });

    var event = this._DAYEVENT.getdayevent().then((data:string) => {
      this.CurrentEvent = data;
      console.log(
        'CurrentEvent out of promise:' + this.CurrentEvent);
    });

    var phonestate = this._PHONESTATE.getphonestate().then((data) => {
      this.IsinCall = data;
      console.log(
        'IsinCall out of promise:' + this.IsinCall);
    });

    var heartrate = this._MIDELWARE.gethertrate().then((data:any[]) => {
      this.tableheartrate =this._MIDELWARE.rrFilter(data);
    });

    //TODO in getlocation : check GPS and Wifi is On
    var location = this._LOCATION.getLocation().then((data) => {
      this.CurrentLocation = data;
      console.log(
        'CurrentLocation out of promise:' + this.CurrentLocation);
    });
    var screenlocked = this._PHONESTATE.getScreenlocked().then((data) => {
      this.Islocked = data;
      console.log(
        'Islocked out of promise:' + this.Islocked);
    });
    this.GeneralTime = Date.now();
    Promise.all
    ([phonestate,screenlocked,nois,event,location,heartrate]).then((res) => {
      console.log(
        '************************************************'+
        '\n Noislevel From promise:' + this.NoisLevel+
        '\n CurrentEvent From promise:'+ this.CurrentEvent+
        '\n CurrentLocation From promise:'+ this.CurrentLocation+
        '\n IsinCall From promise:'+ this.IsinCall+
        '\n Islocked From promise:'+ this.Islocked+
        '\n tableheartrate From promise:'+ this.tableheartrate+
        '\n general time :'+this.GeneralTime +
        '\n ********************************************** \n'
      );
      this._LOCATION.isConnectedToInternet().then(res=>{
          //if WIFI is ON
          if(res){
          //send data to database
            let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
              options: any = {
                NoisLevel: this.NoisLevel,
                CurrentEvent: this.CurrentEvent,
                CurrentLocation: this.CurrentLocation,
                IsinCall: this.IsinCall,
                Islocked: this.Islocked,
                GeneralTime: this.GeneralTime,
                tableheartrate: this.tableheartrate
              },
              url: any = this._HOST + "api/userdata/stressdata";
              this._HTTP
                .put(url + '/' + this._id , options, headers)
                .subscribe((data: any) => {
                  // If the request was successful clear the form of data
                  // and notify the user
                  console.log("seccessfully add new Stress data to database");
                  //this._MIDELWARE.clearPushTable();
                },
                (error: any) => {
                  console.dir(error);
                });
                //check if local database had Data
                this._sqlite.getData().then(res=>{
                    if(!this.isEmpty(res)){
                      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
                      Object.keys(res).map(function(Key, index) {
                        let value = res[Key];
                        let options: any = {
                          NoisLevel: value.NoisLevel,
                          CurrentEvent: value.CurrentEvent,
                          CurrentLocation: value.CurrentLocation,
                          IsinCall: value.IsinCall,
                          Islocked: value.Islocked,
                          GeneralTime: value.GeneralTime,
                          tableheartrate: value.tableheartrate
                        },
                        url: any = this._HOST + "api/userdata/stressdata";
                        this._HTTP
                          .put(url + '/' + this._id , options, headers)
                          .subscribe((data: any) => {
                            // If the request was successful clear the form of data
                            // and notify the user
                            console.log("seccessfully add new Stress data to database");
                            //this._MIDELWARE.clearPushTable();
                          },
                          (error: any) => {
                            console.dir(error);
                          });
                      });
                    }
                });
                this._sqlite.deleteData();
          }
          else{
              this._sqlite.saveData(this.NoisLevel,this.CurrentEvent,this.CurrentLocation,this.IsinCall,this.Islocked,this.GeneralTime,this.tableheartrate);
          }
      });


      //TODO ELSE
      //TODO
    });
  }

  /**
      * Displays a message to the user
      *
      * @public
      * @method displayNotification
      * @param item    {String}      The message to be displayed
      * @return {None}
      */
  displayNotification(message: string): void {
    let toast = this._TOAST.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }




  //*****************
  //dakchi dyali Raji

  public barChartColors: any[] = [
    { // grey
      backgroundColor: 'rgb(18, 159, 229)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#5265f2',
      pointHoverBackgroundColor: '#5265f2',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgb(18, 159, 229)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#5265f2',
      pointHoverBackgroundColor: '#5265f2',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgb(18, 159, 229)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#5265f2',
      pointHoverBackgroundColor: '#5265f2',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]
  public barChartLabels: string[] = ['08:00', '*', '*', '*', '*', '*', '09:00', '*', '*', '*', '*', '*', '10:00', '*', '*', '*', '*', '*', '11:00', '*', '*', '*', '*', '*', '12:00', '*', '*', '*', '*', '*', '13:00', '*', '*', '*', '*', '*', '14:00', '*', '*', '*', '*', '*', '15:00', '*', '*', '*', '*', '*', '16:00', '*', '*', '*', '*', '*', '17:00', '*', '*', '*', '*', '*', '18:00'];
  public barChartType: string = 'bar';

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30, 40, 15, 10, 65, 59, 80, 81, 56, 55, 40, 30, 40, 15, 10, 65, 59, 80, 81, 56, 55, 40, 30, 40, 15, 10, 65, 59, 80, 81, 56, 55, 40, 30, 40, 15, 10, 65, 59, 80, 81, 56, 55, 40, 30, 40, 15, 10, 65, 59, 80, 81, 56, 55, 40, 30, 40, 15, 10], label: 'heart rate' }];


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  openheartrate() {
    this.navCtrl.push(HeartratePage);
  }

  openTipps() {
    this.navCtrl.push(TippsPage);
  }
}
