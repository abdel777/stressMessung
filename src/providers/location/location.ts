import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {File, FileEntry} from '@ionic-native/file';
import {removeUnusedFonts} from "@ionic/app-scripts/dist/optimization/remove-unused-fonts";
/*

*/
@Injectable()
export class LocationProvider {
    private  data :any;
    private  heatMap: any;
    private  AP_table : Array<HotspotNetwork>;


  constructor(public http: HttpClient,
              private _hotspot:Hotspot,
              private _file: File) {}

    /**
     * scan all the available wifi
     * @returns {Promise<any>}
     */
              //this function get all the information about available APs
  public logWifiInfo(){
      let hotspot = this._hotspot;
      let provider = this;
      return new Promise(function (resolve,reject) {

              hotspot.scanWifi().then((networks :Array<HotspotNetwork>)=> {

                      if(networks.length>0) {
                          networks.sort(function(ap1, ap2) {
                              return -(ap1.level) + (ap2.level); });
                          resolve(networks);
                      }else{
                          reject("there are no APs to know the location");
                      }
                  }
              );
      });
    }

    /**
     * get the data locally (off line phase of the fingerprint algorithm)
     * @returns {Promise<any>}
     */
    // this function get the data locally from assets/data which was collected on the ofline stage of fingerPrint method
    public getData(){

        return new Promise(resolve => {
            this.http.get('assets/data/map.json').subscribe((dataa:Array<Info_api>) =>
            {
                resolve(dataa);
            });
        });


    }// end getData()

    /**
     * this the main matching algorithm to find the minimum error, hence the location of the user
     * @param {Array<Info_api>} heatMap
     * @param {Array<HotspotNetwork>} AP_table
     * @returns {Promise<any>}
     */
    // function which use the fingerprinting algorithm to get the position the of the user

    public fingerPrint(heatMap : Array<Info_api>, AP_table: Array<HotspotNetwork>){

        return new Promise(function(resolve, reject){

            // algorithm of heatMap
            let min : number = Math.pow(10,20);
            let err : number = 0;
            let Zonefinale : string;
            for(let i=0;i<heatMap.length;i++){
                let error : number = 0;
                let zone :string = heatMap[i].zone;
                var gefunden = false;

                for(let k=0;k<10;k++){//k<AP_table.length
                    for(let j=0;j<heatMap[i].listAPs.length;j++){
                        if(AP_table[k].BSSID.toLowerCase() == heatMap[i].listAPs[j].BSSID.toLowerCase()){
                            gefunden=true;
                            err = Math.pow(Math.abs(heatMap[i].listAPs[j].level)-Math.abs(AP_table[k].level),2);
                        }
                    }

                    if(gefunden){
                        error += err;
                    }
                }
                //console.log("Zone "+zone+" Error "+error);

                if(min>error){
                    min = error;
                    Zonefinale = zone;
                }
            }
            //console.log("min ="+min+" zone="+Zonefinale);
            resolve(Zonefinale);

        })// end Promise

    }// end fingerPrint()

    /**
     * get the location of the user
     * @returns {Promise<any>}
     */
    // get the final location of the user
    public getLocation(){
     let locationprovider = this;
      return new Promise(function (resolve,reject) {

          locationprovider.printHash().then((networks: Map<string,number[]>)=>{
              let tempArray :  Array<any> =[];
              //let obj : Hostpot_netwriks;
              let temp;
              networks.forEach(function (value, key) {
                  let obj ={};
                  obj['BSSID'] =key;
                  obj['level'] =locationprovider.kalmanFilter(value);
                  //console.log('obj '+obj);
                  tempArray.push(obj);
              });
              //console.log("tempArray"+tempArray);
              return tempArray;
          }).then((networks:Array<HotspotNetwork> )=>{
              locationprovider.getData().then((localData : Array<Info_api>)=>{
                 /* console.log(networks)
                  for(let i=0;i<networks.length;i++){
                      console.log("BSSID "+networks[i].BSSID+', level '+networks[i].level+'\n');
                  }

                  console.log('local data'+localData);*/
                  locationprovider.fingerPrint(localData,networks).then((location:string)=>{
                      //console.log("your location is :"+location);
                      resolve(location);
                  })

              })
          });
      })

    }// end gerLocation
    /**
     * the kalman filter method
     * @kalmanFilter()
     * input : table to filter
     * output : one filer rssi value
     */

    // the kalman filter function which used to remove noises from the receiving RSSI
     public kalmanFilter(tableToFilter) :number {
         let A = 1;
         let H = 1;
         let Q = 1e-6;
         let R = 2;
         let XK = -70;
         let PK = 1;
         let X;
         var K;

         for(let i=0; i<tableToFilter.length;i++ ){
             //Prediction Stage
             var XK1 = XK;
             PK = PK + Q;
             //Update Stage
             K = PK / (PK + R);
             X = XK1 + K*(tableToFilter[i] - XK1);
             PK = (1 - K) * PK;
             XK = X;
         }
         return X;
     }

    // check if the wifi on
    public  isWifiOn(){
        let hotspot = this._hotspot;
        return new Promise(function (resolve,reject) {
            hotspot.isWifiOn().then((res)=>{
                resolve(res);
            })
        })
    }// end isWifiOn

    // check if the isConnectedToInternet
    public  isConnectedToInternet(){
        let hotspot = this._hotspot;
        return new Promise(function (resolve,reject) {
            hotspot.isConnectedToInternet().then((res)=>{
                resolve(res);
            })
        })
    }// end isConnectedToInternet

    /**
     * turnOnWifi
     * @returns {Promise<any>}
     */
    // turn on Hotspot
    public turnOnWifi(){
        let hotspot = this._hotspot;
        return new Promise(function (resolve,reject) {
            hotspot.toggleWifi().then((res)=>{
                resolve(res);
            })
        })
    }// end turnOnWifi

    /**
     * create file
     * @returns {Promise<any>}
     */
    // function that generate locally a file to store all the RSSIs
    public createFile(){
        let file = this._file;
       return new Promise(function (resolve,reject) {
            file.createFile(file.applicationStorageDirectory, 'dataText',true).then((res:FileEntry)=>{
                resolve(res);
            });
        })

    }// end createFile

    /**
     * remove a file
     * @returns {Promise<any>}
     */
    // remove the file
    public removeFile(){
        let file = this._file;
        return new Promise(function (resolve,reject) {
            file.removeFile(file.applicationStorageDirectory,'dataText').then(res=>{
                resolve(res);
            });
        })

    }// end removeFile

    /**
     * write in file
     * @param text
     * @returns {Promise<any>}
     */
    //write on the file
    public writeFile(text : any){
        let file = this._file;
        return new Promise(function (resolve,reject) {
            file.writeFile(file.applicationStorageDirectory, 'dataText', text,{replace:false,append:true}).then((res:boolean)=>{
                resolve(res)
            });
        })

    }// end writeFile

    /**
     * read a file
     * @returns {Promise<any>}
     */
    // read file
    public readFile(){
        let file = this._file;
        return new Promise(function (resolve,reject) {
            file.readAsText(file.applicationStorageDirectory,'dataText').then((res)=>{
                resolve(res)
            })
        })

    }//end readFile

    /**
     * check if a file exist or not
     * @returns {Promise<any>}
     */
    //check if the file is exist
    public checkFile(){
        let file = this._file;
        return new Promise(function (resolve,reject) {
            file.checkFile(file.applicationStorageDirectory,"dataText").then(
                (res) => res,
                (err) => false
        ).then(fileExists => {
                 resolve(fileExists);
            });
        });
    }


    /**
     * this is the original fingerprinring methode
     *
     */
    /*
        public fingerPrint(heatMap : Array<Info_api>, AP_table: Array<HotspotNetwork>){

        return new Promise(function(resolve, reject){

         // algorithm of heatMap
        let min : number = Math.pow(10,20);
        let err : number = 0;
        let Zonefinale : string;
        for(let i=0;i<heatMap.length;i++){
            let error : number = 0;
            let zone :string = heatMap[i].zone;
            var gefunden = false;

            for(let k=0;k<2;k++){//k<AP_table.length
                for(let j=0;j<heatMap[i].listAPs.length;j++){
                    if(AP_table[k].BSSID.toLowerCase() == heatMap[i].listAPs[j].BSSID.toLowerCase()){
                        gefunden=true;
                        err = Math.pow(Math.abs(heatMap[i].listAPs[j].level)-Math.abs(AP_table[k].level),2);
                    }
                }

                if(!gefunden){
                    err = Math.pow(AP_table[k].level,2);
                }
                error += err;
            }
            console.log("Zone "+zone+" Error "+error);

            if(min>error){
                min = error;
                Zonefinale = zone;
            }
        }
        console.log("min ="+min+" zone="+Zonefinale);
        resolve(Zonefinale);

        })// end Promise

    }// end fingerPrint()
     */
    /**
     * this function scan for each AP 1o times diffirrent rssi and store them
     * the idea to filter the rssi values with kalman filter later
     * @returns {Promise<any>}
     */
    public printHash(){
        let locationprovider = this;
        return new Promise(function (resolve,reject) {

           // let myArray:Array<MyHashMap> = [];
            let  store = new Map<string, number[]>();
            let i:number =1;

            var idsetInterval=  window.setInterval(function () {
                locationprovider.logWifiInfo().then((res: Array<HotspotNetwork>) => {

                    res.forEach(function (elem) {

                        if(store.has(elem.BSSID)){
                            let values : number[] = store.get(elem.BSSID);
                            values.push(elem.level);
                            store.set(elem.BSSID,values);

                        }else{
                            let values : number[] = [];
                            values.push(elem.level);
                            store.set(elem.BSSID,values);
                        }

                    });
                });// end then()
                //console.log("i:"+i);
                i++;
                if(i > 10){
                    resolve(store);
                        clearInterval(idsetInterval);
                }

            },2000);


       })//end promise

    }// end printHash

}// end LocalProvider

interface Info_api{
    zone:string,
    listAPs:[
        {BSSID:string, level: number}
        ]
}

export interface MyHashMap{
    key:string,
    values:number[];
}

interface Hostpot_netwriks{
    BSSID:string,
    level:number
}
