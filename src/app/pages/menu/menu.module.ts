import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  { path: '', component: MenuPage,
    children: [{
      path: 'home',
      loadChildren: '../home/home.module#HomePageModule'
    },
    {
      path: 'sport',
      loadChildren: '../sport/sport.module#SportPageModule'
    },
    {
      path: 'players',
      loadChildren: '../players/players.module#PlayersPageModule'
    }, {
      path: 'historic',
      loadChildren: '../historic/historic.module#HistoricPageModule'
    }, {
      path: 'profile',
      loadChildren: '../profile/profile.module#ProfilePageModule'
    }],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
