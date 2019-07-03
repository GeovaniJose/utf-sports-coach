import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-write-notification',
  templateUrl: './write-notification.page.html',
  styleUrls: ['./write-notification.page.scss'],
})
export class WriteNotificationPage implements OnInit {

  public notificacao = {
    assunto: '',
    mensagem: ''
  };

  constructor(public modal: ModalController, public toast: ToastService) { }

  ngOnInit() {
  }

  save() {
    if (this.notificacao.assunto.length >= 4 && this.notificacao.mensagem.length >= 10) {
      this.modal.dismiss({
        notification: this.notificacao
      }).then(() =>
        this.toast.presentToast('Notificação escrita com sucesso!')
      );
    } else {
      this.toast.presentToast('Preencha todos os campos corretamente!');
    }
  }

  close() {
    this.modal.dismiss();
  }

}
