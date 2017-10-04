import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public loading = true;
    constructor(public navCtrl: NavController, private statusBar: StatusBar) {
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#008dbc');
        setTimeout(function () {
            this.loading = false;
        }.bind(this), 22000);
        //    this.statusBar.show();
    }

}
