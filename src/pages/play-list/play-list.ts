import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import firebase from "firebase";

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//import { CONFIG } from '../../config';
import { YouTube, SearchRequest } from 'youtube-search-google-api';

/**
 * Generated class for the PlayListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const localConfigs = {
  API_KEy: 'AIzaSyDGkjcrmfW31SJV9dYrp2tnVD_MPDbOH7w',
  TIMEOUT: 1000
}

@IonicPage()
@Component({
  selector: 'page-play-list',
  templateUrl: 'play-list.html',
})
export class PlayListPage {

  searchQuery: string = '';
  items: string[];

  youtubeOptions: any;
   youtube: any;

   videoUrl: SafeResourceUrl = null;

private locked: boolean = false;

  private dataBase = firebase.database();

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private domSanitizer: DomSanitizer
  )
  {


  }

 initializeItems() {
    this.items = [
    ];
  }

  setVideoUrlNull(){
    this.videoUrl = null;
  }


  createVideoLink(youtubeId: string) {
    return "https://www.youtube.com/embed/" + youtubeId;
  }

  updateItems(videos) {
    this.items = videos;
  }

  showVideo(item) {
    //alert(item.videoUrl);
    console.info(item)
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(item.videoUrl);
  }

  search(val: string) {
    new YouTube().search(new SearchRequest({
      query: {
        key: localConfigs.API_KEy,
        maxResults: 50,
        order: 'viewCount',
        type: 'video',
        publishedAfter: '2017-10-01T00:00:00Z',
        q: val
      }
    }, (error, response, body) => {
      // Handle the response...
 


      const results = JSON.parse(body);

      const toSend = results.items.map((item) => {
        const { snippet } = item;

        return {
          videoId: item.id.videoId,
          title: snippet.title,
          videoUrl: this.createVideoLink(item.id.videoId),
          photoUrl: snippet.thumbnails.medium.url,
          publishedAt: snippet.publishedAt
        }
      });

      this.updateItems(toSend);
    }))
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;


    if (!this.locked) {
      this.locked = true;
      setTimeout(() => {
        this.search(val);
        this.locked = false;
      }, localConfigs.TIMEOUT)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayListPage');

    this.initializeItems();
  }

  createNewPlayList() : void {
    const userID : string = firebase.auth().currentUser.uid;
    let prompt = this.alertCtrl.create({
      title: 'add new playlist',
      message: "enter the name of your new playlist",
      inputs: [
        {
          name:'playlist',
          placeholder: 'Playlist name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { console.log('Cancel clicked'); }
        },
        {
          text: 'Save',
          handler: data => {
            this.dataBase.ref(`/userProfile/` + userID).child('/playlistes/').push(data.playlist);
          }
        }
      ]
      }
    );
    prompt.present();
  }

}
