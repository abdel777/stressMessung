var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
var HeartRateProvider = /** @class */ (function () {
    function HeartRateProvider(toastCtrl, ble, ngZone, alertCtrl, diagnostic, storage, http) {
        this.toastCtrl = toastCtrl;
        this.ble = ble;
        this.ngZone = ngZone;
        this.alertCtrl = alertCtrl;
        this.diagnostic = diagnostic;
        this.storage = storage;
        this.http = http;
        this.peripheral = {};
        this.devices = [];
        this.H7isConncted = false;
        this.disableH7button = false;
        this.data1 = [];
        this.data2 = [];
        this.data3 = [];
        this.url = 'http://localhost:50451/heart/';
        var user;
        user = {
            name: "ta"
        };
    }
    HeartRateProvider.prototype.scan = function () {
        var _this = this;
        this.setStatus('Scanning ');
        this.devices = [];
        this.ble.scan(['180d'], 5).subscribe(function (device) { return _this.onDeviceDiscovered(device); }, function (error) { return _this.scanError(error); });
        setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    };
    HeartRateProvider.prototype.onDeviceDiscovered = function (device) {
        var _this = this;
        console.log('Discovered ' + JSON.stringify(device, null, 2));
        this.ngZone.run(function () {
            _this.devices.push(device);
        });
    };
    HeartRateProvider.prototype.scanError = function (error) {
        this.setStatus('Error ' + error);
        var toast = this.toastCtrl.create({
            message: 'Error scanning  Bluetooth ',
            position: 'middle',
            duration: 5000
        });
        toast.present();
    };
    HeartRateProvider.prototype.connect = function (deviceid) {
        var _this = this;
        this.ble.connect(deviceid).subscribe(function (peripheral) { return _this.onConnected(deviceid); }, function (peripheral) { return _this.onDeviceDisconnected(deviceid); });
        setTimeout(this.setStatus.bind(this), 5000, 'connected');
    };
    HeartRateProvider.prototype.onConnected = function (deviceid) {
        var _this = this;
        this.setStatus('Connected to ' + (deviceid));
        this.ble.startNotification(deviceid, '180d', '2a37').subscribe(function (data) { return _this.ondataChange(data); }, function () { return _this.showAlert('Unexpected Error', 'Failed to subscribe '); });
        this.DevicesId = deviceid;
    };
    HeartRateProvider.prototype.ondataChange = function (buffer) {
        var _this = this;
        var data = new Uint8Array(buffer);
        this.ngZone.run(function () {
            _this.heartrate = data[1];
            _this.setStatus('Data changed  ');
        });
        this.H7isConncted = true;
        this.disableH7button = true;
    };
    HeartRateProvider.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    HeartRateProvider.prototype.onDeviceDisconnected = function (deviceid) {
        var toast = this.toastCtrl.create({
            message: 'The peripheral unexpectedly disconnected',
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    HeartRateProvider.prototype.setStatus = function (message) {
        var _this = this;
        console.log(message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    HeartRateProvider.prototype.disconnect = function (t) {
        var _this = this;
        this.ble.disconnect(t).then(function (succsse) { return _this.disconnectdevice(); }, function (Error) { return _this.Err(); });
    };
    HeartRateProvider.prototype.disconnectdevice = function () {
        this.heartrate = "";
        this.DevicesId = "";
        this.disableH7button = false;
        this.setStatus(' ');
    };
    HeartRateProvider.prototype.Err = function () {
        console.log("err");
    };
    HeartRateProvider.prototype.Bluetooth = function () {
        var _this = this;
        this.diagnostic.getBluetoothState()
            .then(function (state) {
            if (state == _this.diagnostic.bluetoothState.POWERED_ON) {
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'blu is ZU',
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
            }
        });
    };
    HeartRateProvider.prototype.gethertrateapi = function () {
        return this.http.get(this.url + 'tawfik_bouguerba@hotmail.fr');
    };
    HeartRateProvider.prototype.search = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.url + 'tawfik_bouguerba@hotmail.fr')
                .toPromise()
                .then(function (res) {
                _this.dattt = res;
                console.log("in", _this.dattt.success);
                resolve(_this.dattt);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    HeartRateProvider.prototype.exprience = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var idsetInterval = window.setInterval((function () {
                this.myFunction().then(function (data) {
                    if (data === 'failure') {
                        clearInterval(interval);
                        reject(Error('fail'));
                    }
                    else if (data === 'success') {
                        resolve('complete');
                    }
                });
            }).bind(_this), 1000);
        });
    };
    HeartRateProvider.prototype.myFunction = function () {
        var promise = new Promise(function (resolve, reject) {
            var t = 0;
            if (t < 6) {
                console.log(this.data1.push(1));
                console.log(this.data2.push(this.data1[t]));
                console.log("data1", this.data1[t], t);
                console.log("data2", this.data2[t], t);
                resolve(this.data1);
                t++;
            }
            else {
                this.data3.length = 0;
                for (var i = 0; i < this.data2.length; i++) {
                    this.data3[i] = this.data2[i];
                }
                console.log("this.data3", this.data3);
                t = 0;
                this.data2.length = 0;
                this.data1.length = 0;
                console.log(this.data1.push(1));
                console.log(this.data2.push(this.data1[t]), t);
                console.log("data1", this.data1[t], t);
                console.log("data2", this.data2[t], t);
                t++;
                return (this.data3);
            }
        });
        return promise;
    };
    HeartRateProvider.prototype.fun = function () {
        var _this = this;
        var t = 0;
        this.timer = Observable.timer(0, 1000);
        this.subscription = this.timer.subscribe(function () {
            console.log(_this.data1.push(1));
            console.log(_this.data2.push(_this.data1[t]));
            console.log("data1", _this.data1[t], t);
            console.log("data2", _this.data2[t], t);
            t++;
        });
    };
    HeartRateProvider.prototype.reverse = function (items) {
        var toreturn = [];
        for (var i = this.items.length - 1; i >= 0; i--) {
            this.toreturn.push(this.items[i]);
        }
        return this.toreturn;
    };
    HeartRateProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastController,
            BLE,
            NgZone,
            AlertController,
            Diagnostic,
            Storage,
            HttpClient])
    ], HeartRateProvider);
    return HeartRateProvider;
}());
export { HeartRateProvider };
//# sourceMappingURL=heart-rate.js.map