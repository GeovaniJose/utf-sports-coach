import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { FirebaseService } from './../../services/firebase.service';
import { UsuarioService } from './../../services/usuario.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public sports = [];
  public userId = '';
  public userAtletic = '';
  public showLoading = true;

  constructor(
    public firebase: FirebaseService,
    public usuario: UsuarioService,
    public alert: AlertController,
    public toast: ToastService
  ) {
    this.usuario.getUserData().subscribe(user => {
      this.userId = user.id;
      this.userAtletic = user.atletica;
      this.chargeSports();
    });
  }

  ngOnInit() {
  }

  async registerSport() {
    const registerAlert = await this.alert.create({
      header: 'Cadastrar Esporte',
      inputs: [
        {
          type: 'text',
          name: 'esporte',
          placeholder: 'Informar esporte...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: async (input) => {
            if (input.esporte.length >= 5) {
              const sport = {
                title: input.esporte,
                coach: this.userId,
                atletica: this.userAtletic
              };

              await this.firebase.db().collection('sports').add({
                ...sport
              });

              this.chargeSports();

              this.toast.presentToast('Esporte cadastrado com sucesso!');
            } else {
              this.toast.presentToast('Insira um esporte com no mínimo 5 letras!');
            }
          }
        }
      ]
    });

    await registerAlert.present();
  }

  async chargeSports() {
    await this.firebase.db().collection('sports')
      .where('coach', '==', this.userId)
      .onSnapshot(results => {
        this.sports = [];

        results.docs.forEach(doc => {
          this.sports.push({ id: doc.id, ...doc.data() });
        });

        this.showLoading = false;
      });
  }

}
