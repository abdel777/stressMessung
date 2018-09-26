import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { HeartRateProvider } from '../heart-rate/heart-rate';

@Injectable()
export class MidelwareProvider {
  ApiIsConncted = false;
  H7IsConncted = false;
  constructor(public http: HttpClient, public heartRate: HeartRateProvider, private storage: Storage) {
    //console.log('Hello MidelwareProvider Provider');
    this.storage.get('buttonapi').then((val) => {
      this.ApiIsConncted = val;

    });
    console.log("hier is h7", this.heartRate.H7isConncted);
    this.H7IsConncted = this.heartRate.H7isConncted;
  }




  clearPushTable(){
    this.heartRate.clearTable();
  }
  gethertrate() {
    let THIS = this;
    return new Promise((resolve, reject) => {
      console.log("your buttonapi:", this.heartRate.APICONNCTED);
      console.log("hier is h7", this.heartRate.H7isConncted);


      if (THIS.heartRate.H7isConncted) {
        THIS.heartRate.getHeartrate()
          .then(function(data:any[]) {
             
            //console.log('i am in getHeartrate middelware data:'+data);
            resolve(data);
            
          })

      }
      else if (this.heartRate.APICONNCTED) {
        let email ='tawfik_bougerba@hotmail.fr';
        console.log(" i m in api akhay diali");
        THIS.heartRate.get_api()
          .then(function(data) {
            resolve(data);
            //console.log(data);
             //console.log('i am in getHeartrate  api middelware data:'+data);
          })

      }
      else {

        console.log("tawf");


      }
    })
  }

// this function filter the rr intervals
// [234,45]
// [{"rrTime":455,"rrValue":345},{"rrTime":555,"rrValue":545}]
rrFilter(tableToFilter) 
      {
       
       let firstime = tableToFilter[0].rrTime;
       let tableToFilterr:Array<any> = [];
       
       tableToFilter.forEach(function(elem){
          tableToFilterr.push(elem.rrValue);
       })
        
       

       let table2 : Array<any>=[];
       let tableResulata : Array<any> = [];
       let prozent : any;
       let meanadjacant : any;
     
      for(var i=0; i<tableToFilterr.length ; i++)
      {
        if((tableToFilterr[i]<1400 )&&(tableToFilterr[i]>0) )
        {
           table2.push(tableToFilterr[i]);
        }      
      }

      // 
      if(table2.length >0)
      {
       tableResulata.push({"rrTime":firstime,"rrValue":table2[0]});
       firstime=firstime+table2[0];
        for(var k=1; k<table2.length ; k++)
         {
           prozent= (table2[k-1] *10) / 100;
               if( (Math.abs(table2[k]- table2[k-1]))<= prozent)
                  {
                    
                    tableResulata.push({"rrTime":firstime,"rrValue":table2[k]});
                    firstime=firstime+table2[k];

                  }
                  else if(k== table2.length-1 )
                  {
                        tableResulata.push({"rrTime":firstime,"rrValue":table2[k-1]+prozent});
                  }else
                    {
                        meanadjacant= (table2[k-1]+table2[k+1])/2;
                        table2[k]=  meanadjacant;
                        tableResulata.push({"rrTime":firstime,"rrValue":meanadjacant});
                        firstime=firstime+meanadjacant;
                    } 
         }
      }
      
      return tableResulata;
      }// end rrFilter

      rmssdCalaculator(table){
        let sum = 0;
        let oneMinuteTest =table[0].rrTime;
        let N = table.length;
        let len = 0;
        let resultat;
        let rmssdTable : Array<any> =[];

        for(let i = 1;i<N;i++){
          
          if((table[i].rrTime - oneMinuteTest) <= 60000){
          sum += Math.pow(table[i].rrValue - table[i-1].rrValue,2)
          }else{
            len = i-len;
            resultat= Math.sqrt(sum/len);
            rmssdTable.push(resultat);
            console.log(i+" - one oneMinuteTest :"+oneMinuteTest+"\n");
            sum = 0;
            oneMinuteTest =table[i].rrTime;
            len =i;
          }
        }

       
       return rmssdTable;

        
      }// end rmssd


}
