import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { AuthProvider} from "../../providers/auth/auth";
import { LoginPage } from "../../pages/login/login";

/**
 * Generated class for the MyMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-menu',
  templateUrl: 'my-menu.html'
})
export class MyMenuComponent {

  text: string;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider
  ) {}

  logoutUser(): void {
    this.authProvider.logoutUser();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  };

}
