import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-mark-training',
  templateUrl: './mark-training.page.html',
  styleUrls: ['./mark-training.page.scss'],
})
export class MarkTrainingPage implements OnInit {

  @Input() sportId: string;
  public treino = {
    data: '',
    tipo: '',
    horaIni: '',
    horaFim: '',
    check: false
  };

  constructor(public modal: ModalController, public toast: ToastService) {}

  ngOnInit() {
  }

  save() {
    if (this.treino.data && this.treino.horaIni && this.treino.horaIni && this.treino.tipo.length >= 4) {
      this.modal.dismiss({
        training: this.treino
      }).then(() =>
        this.toast.presentToast('Treino marcado com sucesso!')
      );
    } else {
      this.toast.presentToast('Preencha todos os campos!');
    }
  }

  close() {
    this.modal.dismiss();
  }

}
