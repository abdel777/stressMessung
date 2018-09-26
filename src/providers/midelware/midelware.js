var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HeartRateProvider } from '../heart-rate/heart-rate';
var MidelwareProvider = /** @class */ (function () {
    function MidelwareProvider(http, heartRate, storage) {
        this.http = http;
        this.heartRate = heartRate;
        this.storage = storage;
        this.ApiIsConncted = false;
        console.log('Hello MidelwareProvider Provider');
    }
    MidelwareProvider.prototype.gethertrate = function () {
        var _this = this;
        this.storage.get('buttonapi').then(function (val) {
            _this.ApiIsConncted = val;
            console.log("your buttonapihhhh", _this.ApiIsConncted);
        });
        console.log("hier is h7", this.heartRate.H7isConncted);
    };
    MidelwareProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, HeartRateProvider, Storage])
    ], MidelwareProvider);
    return MidelwareProvider;
}());
export { MidelwareProvider };
//# sourceMappingURL=midelware.js.map