import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { PlayListPage } from './play-list';
//import { YouTubeModule, SearchRequestModule } from 'youtube-search-google-api'

@NgModule({
  declarations: [
    PlayListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayListPage),
    CommonModule
    //YouTubeModule,
    //SearchRequestModule
  ],
  exports: [
  	PlayListPage
  ]
})
export class PlayListPageModule {}
