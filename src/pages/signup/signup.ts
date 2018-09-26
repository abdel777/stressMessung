import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Injectable } from '@angular/core';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
@Injectable()
export class SignupPage {
    debouncer: any;
    public form                  : FormGroup;
    public type = 'password';
    public showPass = false;
    loading: any;
    regData = { username:'', password:'', email:'', passwordConf:'' };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public authService: AuthServiceProvider,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private formBuilder:FormBuilder) {
                    this.form = this.formBuilder.group({
                    username:['',[Validators.required] , this.checkUsername.bind(this) ],
                    email:['',Validators.compose([Validators.required, Validators.email])],
                    password:['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
                    passwordConf:['',Validators.required]
                },
                {validator: this.matchingPasswords('password', 'passwordConf')});
    }

    //function to check if password and passconf are the same
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let passwordconf = group.controls[confirmPasswordKey];

            if (password.value !== passwordconf.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }


    //function to show and hide the password
    showPassword() {
        this.showPass = !this.showPass;
        if(this.showPass){
            this.type = 'text';
            console.log('type '+this.type);
        }
        else {
            this.type = 'password';
            console.log('type '+this.type);
        }
    }


    // function to register the new user in Database
    doSignup() {
        this.showLoader();
        this.authService.register(this.regData).then((result) => {
            this.loading.dismiss();
            this.navCtrl.pop();
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    }
    presentToast(msg) {
        let toast = this.toastCtrl.create({
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

    //Check user if already in data base
    checkUsername(control : FormControl):any{
        clearTimeout(this.debouncer);
        return new Promise(resolve => {
            this.debouncer =setTimeout(()=>{
                this.authService.validateUsername(control.value).subscribe((res)=> {
                        if (res['recs'] && res['recs'].hasOwnProperty(0)) {
                            resolve({usernameInUse: true});
                        }
                    resolve(null);
                },(err)=>{
                    resolve({usernameInUse: true});
                    });
            },1000)
        });
    }

}
