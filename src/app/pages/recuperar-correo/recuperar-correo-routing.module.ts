import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarCorreoPage } from './recuperar-correo.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarCorreoPageRoutingModule {}
