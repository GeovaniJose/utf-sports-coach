import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { FirebaseService } from './../../services/firebase.service';
import { UsuarioService } from './../../services/usuario.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user = {};

  constructor(
    public firebase: FirebaseService,
    public usuario: UsuarioService,
    public alert: AlertController,
    public toast: ToastService
  ) {
    this.usuario.getUserData().subscribe(user => {
      this.user = user;
      // this.chargeSports();
    });
  }

  ngOnInit() {
  }

}
