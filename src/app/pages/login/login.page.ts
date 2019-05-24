import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email = '';
  public senha = '';
  public checkingUser = true;
  public showLoading = false;

  constructor(public usuario: UsuarioService, public router: Router) {
    this.usuario.getUser().subscribe(user => {
      (user.isOnline)
        ? this.router.navigateByUrl('/home')
        : this.checkingUser = false;
    });
  }

  ngOnInit() {
  }

  async login() {
    try {
      this.showLoading = true;
      await this.usuario.login(this.email, this.senha);
      this.showLoading = false;
      this.router.navigateByUrl('/home');
    } catch (erro) {
      this.showLoading = false;
    }
  }

}
