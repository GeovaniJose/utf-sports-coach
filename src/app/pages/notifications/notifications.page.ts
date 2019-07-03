import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

import { FirebaseService } from './../../services/firebase.service';
import { ToastService } from './../../services/toast.service';

import { WriteNotificationPage } from './../write-notification/write-notification.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public sport;
  public notifications = [];
  public showLoading = true;

  constructor(
    public firebase: FirebaseService,
    public route: ActivatedRoute,
    public modal: ModalController,
    public alert: AlertController,
    public toast: ToastService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.sport = params;
      }

      this.chargeNotifications();
    });
  }

  ngOnInit() {
  }

  async chargeNotifications() {
    await this.firebase.db().collection('notifications')
      .where('sportId', '==', this.sport.id)
      .onSnapshot(results => {
        this.notifications = [];

        results.docs.forEach(doc => {
          this.notifications.push({
            id: doc.id,
            ...doc.data()
          });
        });

        this.showLoading = false;
      });
  }

  async writeNotification() {
    const page = await this.modal.create({
      component: WriteNotificationPage
    });

    await page.present();

    const { data } = await page.onDidDismiss();
    if (data) {
      await this.firebase.db().collection('notifications')
        .add({
          sportId: this.sport.id,
          ...data.notification
        });

      this.chargeNotifications();
    }
  }

  async deleteNotification(notific) {
    const checkAlert = await this.alert.create({
      header: 'Excluir Notificação',
      message: 'Tem certeza que deseja excluir esta notificação?',
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.firebase.db().collection('notifications')
              .doc(notific.id)
              .delete();

            this.toast.presentToast('Notificação excluída com sucesso!');
          }
        },
        {
          text: 'Não'
        }
      ]
    });

    await checkAlert.present();
  }

}
