import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider} from "../../providers/auth/auth";
import { LoginPage} from "../login/login";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider) {
  }

  logoutUser(): void {
    this.authProvider.logoutUser();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }
}
