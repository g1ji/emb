import {Component} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HomePage} from '../pages/home/home';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public push: Push,
        public alertCtrl: AlertController,
        public http: Http) {
        platform.ready().then(() => {

            setTimeout(function () {
                splashScreen.hide();
            }.bind(this), 12000);
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            this.pushsetup();
        });
    }
    postRequest(userToken) {
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});

        let postParams = {
            userToken: userToken
        }
        this.http.post("http://52.66.120.231:8005/api/mobile/saveToken", postParams, options)
            .subscribe(data => {
                console.log("afsdfdsfasdf");
                console.log(data['_body']);
            }, error => {
                console.log(error);// Error getting the data
            });
    }
    pushsetup() {
        const options: PushOptions = {
            android: {
                senderID: '198630949870'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => {
            console.log(notification)
            if (notification.additionalData.foreground) {
                let youralert = this.alertCtrl.create({
                    title: 'Server msg',
                    message: notification.message
                });
                youralert.present();
            }
        });
        pushObject.on('registration').subscribe((registration: any) => {
            console.log('device token -> ' + JSON.stringify(registration));
            //TODO - send device token to server
            let device_token = localStorage.getItem('device_token');
            if (!device_token) {
                localStorage.setItem('device_token', JSON.stringify(registration));
                if (registration && registration.registrationId) {
                    this.postRequest(registration.registrationId)
                }
            }
        });

        pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
    }



}