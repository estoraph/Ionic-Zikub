import { Component } from '@angular/core';

import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../../pages/tabs/tabs';
import { TermsAndConditionsPage } from "../terms-and-conditions/terms-and-conditions";


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.signupForm = formBuilder.group({
      username: ['',
        Validators.compose([Validators.minLength(6),Validators.required])],
      firstname: ['',
        Validators.compose([Validators.minLength(1),Validators.required])],
      lastname: ['',
        Validators.compose([Validators.minLength(1),Validators.required])],
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      checkbox: ['',
        Validators.compose([Validators.requiredTrue])],
    });
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.username,
        this.signupForm.value.lastname,
        this.signupForm.value.firstname)
        .then(() => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(TabsPage);
          });
        }, (error) => {
          this.loading.dismiss().then( () => {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToTermsAndConditions(): void{
    this.navCtrl.push(TermsAndConditionsPage);
  }

}
