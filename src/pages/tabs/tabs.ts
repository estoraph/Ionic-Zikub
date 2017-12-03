import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { NavController } from "ionic-angular";
import { PlayListPage } from "../play-list/play-list";
import { AuthProvider} from "../../providers/auth/auth";
import { LoginPage} from "../login/login";
import { HelpPage } from "../help/help";
import {ProfilePage} from "../profile/profile";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlayListPage;
  tab3Root = SettingsPage;
  tab4Root = AboutPage;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider) {
  }

  logoutUser(): void {
    this.authProvider.logoutUser();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  };

  openHelpPage(): void{
    this.navCtrl.push(HelpPage);
  }

  openProfil(): void{
    this.navCtrl.push(ProfilePage);
  }

}
