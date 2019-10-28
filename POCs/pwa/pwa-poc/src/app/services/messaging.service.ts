import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { firebase } from '@firebase/app';
import '@firebase/messaging';

@Injectable()
export class MessagingService {

  public currentMessage = new BehaviorSubject(null);

  public get isSupported(): boolean {
    return firebase && firebase.messaging.isSupported();
  }

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    }

  public subscribeToMessaging() {
    return this.angularFireMessaging.messaging.subscribe(
        (messaging) => {
          messaging.onMessage = messaging.onMessage.bind(messaging);
          messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
        }
      );
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  public requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(`Request permission for userId=${userId}, got toke=${token}`);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify', err);
      }
    );
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  public updateToken(userId: string, token: string) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
     () => {
       console.log(`Update token: userId=${userId}, token=${token}`);
       const data = {};
       data[userId] = token;
       this.angularFireDB.object('fcmTokens/').update(data);
    });
  }

  /**
   * hook method when new notification received in foreground
   */
  public receiveMessage() {
    return this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('New message received', payload);
        this.currentMessage.next(payload);
      });
  }
}
