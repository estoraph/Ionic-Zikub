import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect} from "@ionic-native/twitter-connect";
import firebase from 'firebase';

import 'rxjs/add/operator/map';

/*

*/
@Injectable()
export class AuthProvider {

  constructor(
    public facebook: Facebook,
    public google: GooglePlus,
    public twitter: TwitterConnect
  ) {
    console.log('AuthProvider has created');
  }

  getUser(): firebase.User {
    return firebase.auth().currentUser;
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(
    email: string,
    password: string,
    username: string,
    lastname: string,
    firstname: string
  ): Promise<any> {

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        firebase
          .database()
          .ref('/userProfile')
          .child(newUser.uid)
          .set(
            {
              email: email,
              username: username,
              firstname: firstname,
              lastname: lastname
            });
      });
  }

  facebookLogin_redi(): Promise<any> {
    // Default language of the browser
    firebase.auth().useDeviceLanguage();
    // Create an instance of the Facebook provider object
    let provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithRedirect(provider);

  }

  facebookLogin_Popup(): Promise<any> {
    // Default language of the browser
    firebase.auth().useDeviceLanguage();
    // Create an instance of the Facebook provider object
    let provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider)
      .then( res => {
        console.log(res);
      })
      .catch( err => {
        console.error('Error : ', err);
      });
  }

  facebookLogin_Credential(): Promise<any> {
    return this.facebook
      .login(['email', 'public_profile'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );

        return firebase.auth()
          .signInWithCredential(facebookCredential)
          .then( success => {
            console.log('Firebase success: ' + JSON.stringify(success));
          })
          .catch( error => {
            console.log('Firebase failure: ' + JSON.stringify(error));
          });
      })
      .catch( error => {
        console.log(error);
      })
  }

  googleLogin(): Promise<any> {
    return this.google
      .login({
        webClientId:
        '567074256657-ehu9muqbaiac3u0g3cc3835630p21iq3.apps.googleusercontent.com',
        offline: true
      })
      .then( res => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          res.idToken
        );

        firebase.auth()
          .signInWithCredential(credential)
          .then( success => {
            console.log('Firebase success; ' + JSON.stringify(success));
          })
          .catch( error => {
            console.log('Firebase failure: ' + JSON.stringify(error))
          });
      })
      .catch( err => { console.error('Error : ', err)});
  }

  twitterLogin(): Promise<any> {
    return this.twitter
      .login()
      .then( resultat => {
        const twitterCredential = firebase.auth.TwitterAuthProvider.credential(
          resultat.token,
          resultat.secret
        );

        firebase.auth()
          .signInWithCredential(twitterCredential)
          .then( success => {
            console.log('Firebase success; ' + JSON.stringify(success));
          })
          .catch( error => {
            console.log('Firebase failure: ' + JSON.stringify(error))
          });
      })
      .catch(err => { console.error('Error : ', err)});
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

}
