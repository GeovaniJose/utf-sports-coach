import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MarkTrainingPage } from './mark-training.page';

const routes: Routes = [
  {
    path: '',
    component: MarkTrainingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MarkTrainingPage]
})
export class MarkTrainingPageModule {}
