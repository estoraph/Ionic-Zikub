import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { PlayListPage } from './play-list';
import { PipesModule } from '../../pipes/pipes.module'
//import { YouTubeModule, SearchRequestModule } from 'youtube-search-google-api'

@NgModule({
  declarations: [
    PlayListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayListPage),
    CommonModule,
    PipesModule
  ],
  exports: [
  	PlayListPage
  ]
})
export class PlayListPageModule {}
