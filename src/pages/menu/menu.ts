import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider} from "../../providers/auth/auth";
import { LoginPage } from "../login/login";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider) {
  }

  logoutUser(): void {
    this.authProvider.logoutUser();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
