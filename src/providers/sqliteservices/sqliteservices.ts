import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the SqliteservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteservicesProvider {


  StressData: any = [];
  constructor(public http: HttpClient,
              public _SQLITE: SQLite) {
  }

  // This SQLITE functions need to move to separate provider
  getData() {
  let sqliteprovider = this;
  return new Promise(function (resolve,reject) {
    sqliteprovider._SQLITE.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM StressData', {})
      .then(res => {
        sqliteprovider.StressData = [];
        for(var i=0; i<res.rows.length; i++) {
          sqliteprovider.StressData.push({NoisLevel: res.rows.item(i).NoisLevel,
          CurrentEvent: res.rows.item(i).CurrentEvent,
          CurrentLocation: res.rows.item(i).CurrentLocation,
          IsinCall: res.rows.item(i).IsinCall,
          Islocked: res.rows.item(i).Islocked,
          GeneralTime: res.rows.item(i).GeneralTime,
          tableheartrate: res.rows.item(i).tableheartrate});
          resolve(sqliteprovider.StressData);
        }
      })
    })
      .catch(e => console.log(e));
    });
}
createtable(){
  this._SQLITE.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS StressData(NoisLevel INT, CurrentEvent TEXT, CurrentLocation TEXT, IsinCall TEXT,Islocked TEXT, GeneralTime TEXT)', {})
    .then(res => {console.log('Executed SQL');
          console.dir(res);})
    .catch(e => console.log(e));
  });
}

saveData(NoisLevel,CurrentEvent,CurrentLocation,IsinCall,Islocked,GeneralTime,tableheartrate){
  this._SQLITE.create({
       name: 'ionicdb.db',
       location: 'default'
  }).then((db: SQLiteObject)=>{
    db.executeSql('INSERT INTO expense VALUES(?,?,?,?,?,?,?)',[NoisLevel,CurrentEvent,CurrentLocation,IsinCall,Islocked,GeneralTime,tableheartrate]).then(res => {
    }).catch(e=> {console.log(e)})
  }).catch(e => { console.log(e)});
}

deleteData(){
  this._SQLITE.create({
       name: 'ionicdb.db',
       location: 'default'
  }).then((db: SQLiteObject)=>{
    db.executeSql('DELETE FROM expense',{}).then(res => {
    }).catch(e=> {console.log(e)})
  }).catch(e => { console.log(e)});
}

  //---------------Sqlite functions finish-----------

}
