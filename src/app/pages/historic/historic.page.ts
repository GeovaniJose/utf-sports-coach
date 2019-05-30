import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

import { FirebaseService } from './../../services/firebase.service';
import { MarkTrainingPage } from './../mark-training/mark-training.page';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.page.html',
  styleUrls: ['./historic.page.scss'],
})
export class HistoricPage implements OnInit {

  public sport;
  public treinos = [];
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

      this.chargeHistoric();
    });
  }

  ngOnInit() {
  }

  async chargeHistoric() {
    await this.firebase.db().collection('sports')
      .doc(this.sport.id)
      .collection('trainings')
      .where('check', '==', true)
      .onSnapshot(results => {
        this.treinos = [];

        results.docs.forEach(doc => {
          const options = { weekday: 'long', day: 'numeric', month: 'short' };

          let formatada = new Intl.DateTimeFormat('default', options).format(new Date(doc.data().data)).toString();

          const formataDia = formatada.substr(0, 1).toUpperCase() + formatada.substr(1);

          let formataMes = formatada.substr(-3);
          formataMes = formataMes.substr(0, 1).toUpperCase() + formataMes.substr(1);

          formatada = formataDia.substr(0, (formataDia.length - 3)) + formataMes;

          this.treinos.push({
            id: doc.id,
            ...doc.data(),
            data: formatada,
            horaIni: doc.data().horaIni.substr(11, 5),
            horaFim: doc.data().horaFim.substr(11, 5),
          });
        });

        this.showLoading = false;
      });
  }

}
