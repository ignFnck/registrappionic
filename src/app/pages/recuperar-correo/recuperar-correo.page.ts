import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-correo',
  templateUrl: './recuperar-correo.page.html',
  styleUrls: ['./recuperar-correo.page.scss'],
})
export class RecuperarCorreoPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Listo',
      
      message: 'Mensaje enviado al correo electrónico ',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
