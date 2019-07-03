import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { FirebaseService } from './../../services/firebase.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.page.html',
  styleUrls: ['./presenca.page.scss'],
})
export class PresencaPage implements OnInit {

  @Input() public sportId;
  public players = [];
  public showLoading = true;

  constructor(
    public modal: ModalController,
    public firebase: FirebaseService,
    public toast: ToastService,
    public navParams: NavParams
  ) {
    this.sportId = this.navParams.get('sportId');
    this.chargePlayers();
  }

  ngOnInit() {
  }

  async chargePlayers() {
    const results = await this.firebase.db().collection('sports')
      .doc(this.sportId)
      .collection('players')
      .orderBy('nome')
      .get();

    this.players = [];

    results.docs.forEach(doc => {
      this.players.push({
          id: doc.id,
          checked: false,
          corIcon: '',
          ...doc.data()
        });
    });

    this.showLoading = false;
  }

  async marked(player, pos) {
    if (!player.checked) {
      this.players[pos].corIcon = 'primary';
      this.players[pos].checked = true;
      this.players[pos].presenca += 1;
    } else {
      this.players[pos].corIcon = '';
      this.players[pos].checked = false;
      this.players[pos].presenca -= 1;
    }
  }

  save() {
    this.players.forEach(async player => {
      await this.firebase.db().collection('sports')
        .doc(this.sportId)
        .collection('players')
        .doc(player.id)
        .set({
          presenca: player.presenca
        }, {merge: true});
    });

    this.modal.dismiss({
      truePresented: true
    }).then(() =>
      this.toast.presentToast('Prensença realizada com sucesso!')
    );
  }

  close() {
    this.modal.dismiss();
  }

}
