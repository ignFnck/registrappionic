import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarCorreoPageRoutingModule } from './recuperar-correo-routing.module';

import { RecuperarCorreoPage } from './recuperar-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarCorreoPageRoutingModule
  ],
  declarations: [RecuperarCorreoPage]
})
export class RecuperarCorreoPageModule {}
