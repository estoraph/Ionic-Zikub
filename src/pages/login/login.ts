import { Component } from '@angular/core';
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  AlertController, Platform
} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../../pages/tabs/tabs';
import { SignupPage } from "../signup/signup";
import { ResetPasswordPage } from "../reset-password/reset-password";
import { TermsAndConditionsPage } from "../terms-and-conditions/terms-and-conditions";
import * as firebase from "firebase";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public platform: Platform) {

    this.loginForm = formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('page LoginPage has been charged');
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email,
        this.loginForm.value.password)
        .then(AuthProvider => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(TabsPage);
          });
        }, error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  facebookLogin(): void {
    console.log('facebook popoup logging');
    this.authProvider.facebookLogin_Credential()
      .then(() => {
        this.loading.dismiss();
        firebase.auth().onAuthStateChanged( userAuth => {
          if (userAuth) {
            this.navCtrl.setRoot(TabsPage);
            console.log('facebook login works');
          }
        });
      })
      .catch(error => {
        if (error.code == 'auth/popup-closed-by-user') {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        }
      });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

/*  facebookLogin(): void {
    if (this.platform.is('cordova')) {
      console.log('facebook credential logging');
      this.authProvider.facebookLogin_Credential()
        .then(userAuth => {
          this.loading.dismiss();
            if(userAuth) {
              this.navCtrl.setRoot(TabsPage);
              console.log('facebook login works');
            }
          })
        .catch( error => {
          if (error.code == 'auth/popup-closed-by-user') {
            this.loading.dismiss();
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          }
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    } else {
      console.log('facebook popoup logging');
      this.authProvider.facebookLogin_Popup()
        .then(userAuth => {
          this.loading.dismiss().then(() => {
            if (userAuth) {
              this.navCtrl.setRoot(TabsPage);
              console.log('facebook login works');
            }
            ;
          });
        })
        .catch(error => {
          if (error.code == 'auth/popup-closed-by-user') {
            this.loading.dismiss().then(() => {
              let alert = this.alertCtrl.create({
                message: error.message,
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
            });
          }
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }*/

  googleLogin(): void {
    console.log('Google credential logging');
    this.authProvider.googleLogin()
      .then(userAuth => {
        this.loading.dismiss();
        firebase.auth().onAuthStateChanged( userAuth => {
          if (userAuth) {
            this.navCtrl.setRoot(TabsPage);
            console.log('facebook login works');
          }
        });
      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
    this.loading = this.loadingCtrl.create();
    this.loading.present();

  }

  twitterLogin(): void {
    this.authProvider.twitterLogin();
  }

  goToSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword(): void {
    this.navCtrl.push(ResetPasswordPage);
  }

  goToTermsAndConditions(): void{
    this.navCtrl.push(TermsAndConditionsPage);
  }

}
