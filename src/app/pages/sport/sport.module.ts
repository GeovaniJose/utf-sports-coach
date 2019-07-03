import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SportPage } from './sport.page';
import { MarkTrainingPage } from '../mark-training/mark-training.page';
import { PresencaPage } from '../presenca/presenca.page';

const routes: Routes = [
  {
    path: '',
    component: SportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SportPage, MarkTrainingPage, PresencaPage],
  entryComponents: [MarkTrainingPage, PresencaPage]
})
export class SportPageModule {}
