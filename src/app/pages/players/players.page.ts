import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { FirebaseService } from './../../services/firebase.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  public sport;
  public players = [];
  public showLoading = true;

  constructor(
    public firebase: FirebaseService,
    public route: ActivatedRoute,
    public alert: AlertController,
    public social: SocialSharing
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.sport = params;
      }

      this.chargePlayers();
    });
  }

  ngOnInit() {
  }

  async chargePlayers() {
    await this.firebase.db().collection('sports')
      .doc(this.sport.id)
      .collection('players')
      .orderBy('nome')
      .onSnapshot(results => {
        this.players = [];

        results.docs.forEach(doc => {
          this.players.push({ id: doc.id, ...doc.data() });
        });

        this.showLoading = false;
      });
  }

  async sendWhats(phone) {
    const alertWhats = await this.alert.create({
      header: 'Mensagem via WhatsApp',
      inputs: [{
        type: 'text',
        name: 'message',
        placeholder: 'Escreva a mensagem...'
      }],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Enviar',
          handler: form => {
            try {
              this.social.shareViaWhatsAppToReceiver(`+55${phone}`, form.message);
            } catch (error) {
              console.log('Erro', error);
            }
          }
        }
      ]
    });

    await alertWhats.present();
  }

}
