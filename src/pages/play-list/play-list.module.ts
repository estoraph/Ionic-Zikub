import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayListPage } from './play-list';
//import { YouTubeModule, SearchRequestModule } from 'youtube-search-google-api'

@NgModule({
  declarations: [
    PlayListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayListPage),
    //YouTubeModule,
    //SearchRequestModule
  ],
  exports: [
  	PlayListPage
  ]
})
export class PlayListPageModule {}
