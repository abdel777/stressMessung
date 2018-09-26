import {Component} from '@angular/core';
import {NavController, NavParams, MenuController, LoadingController, Toast, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HomePage} from '../home/home';
import {SlidersPage} from '../sliders/sliders';
import {SignupPage} from '../signup/signup';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { Injectable } from '@angular/core';

import {Storage} from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'login.html'
})
@Injectable()
export class LoginPage {

    loading: any;
    loginData = {username: '', password: ''};
    data: any;
    public formlogin: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public authService: AuthServiceProvider,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private formBuilder:FormBuilder) {
        this.formlogin = this.formBuilder.group({
                username:['',Validators.required],
                password:['',Validators.required]
            });
    }

    doLogin() {
        this.showLoader();
        this.authService.login(this.loginData).then((res) => {
            if (res['recs'] && res['recs'].hasOwnProperty(0)) {
                this.data = res['recs'][0];
                localStorage.setItem('username', this.data.username);
                localStorage.setItem('_id', this.data._id);
                this.loading.dismiss();
                this.navCtrl.setRoot(SlidersPage);
            }
            else{
                this.loading.dismiss();
                this.presentToast('your username and password don\'t match');
            }

        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }

    register() {
        this.navCtrl.push(SignupPage);
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 6000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK',
            dismissOnPageChange: true
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
}
