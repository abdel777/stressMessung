var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { HeartRateProvider } from '../../providers/heart-rate/heart-rate';
import { MidelwareProvider } from '../../providers/midelware/midelware';
import { ApiPage } from '../api/api';
var EinstellungPage = /** @class */ (function () {
    function EinstellungPage(navCtrl, navParams, storage, heartRate, midelware) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.heartRate = heartRate;
        this.midelware = midelware;
        this.disableButton = false;
        this.disableH7button = false;
    }
    EinstellungPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad EinstellungPage');
        this.storage.get('buttonapi').then(function (val) {
            _this.disableButton = val;
            console.log("your buttonapihhhh", _this.disableButton);
        });
        this.disableH7button = this.heartRate.disableH7button;
    };
    EinstellungPage.prototype.goBack = function () {
        this.navCtrl.setRoot(HomePage);
    };
    EinstellungPage.prototype.searchBlue = function () {
        this.disableButton = false;
        this.disableH7button = true;
        //this.navCtrl.push(BluetouthPage);
        this.navCtrl.push(ApiPage, { status: true });
        this.storage.remove('buttonapi');
        this.storage.set('buttonapi', false);
    };
    EinstellungPage.prototype.gotohomepage = function (DevicesId) {
        this.disableH7button = false;
        this.disableButton = true;
        this.heartRate.disconnect(DevicesId);
        this.navCtrl.push(ApiPage, { status: true });
        this.storage.remove('buttonapi');
        this.storage.set('buttonapi', true);
    };
    EinstellungPage.prototype.getheartrate = function () {
        var sample = [1, 2, 3];
        this.datt = this.heartRate.reverse([1, 2, 3]);
        console.log(this.reverse);
    };
    EinstellungPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-einstellung',
            templateUrl: 'einstellung.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, HeartRateProvider, MidelwareProvider])
    ], EinstellungPage);
    return EinstellungPage;
}());
export { EinstellungPage };
//# sourceMappingURL=einstellung.js.map