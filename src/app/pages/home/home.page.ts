import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validateRUT, getCheckDigit, generateRandomRUT } from 'validar-rut'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    rut : new FormControl('', [Validators.required ,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, this.noWhitespaceValidator, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8),Validators.pattern('[0-9]')]),
    email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@duocuc.cl')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno')
  });
// TOAST
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'USUARIO YA EXISTE',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
  async contraInco(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'CONTRASEÑAS NO COINCIDEN!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  async regis() {
    const toast = await this.toastController.create({
      message: 'USUARIO REGISTRADO!!',
      duration: 1500,
      icon: 'checkmark-outline'
    });

    await toast.present();
  }

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  verificar_password: string;
  


  
  constructor(private usuarioService: UsuarioService, private toastController: ToastController) {}
  birthday = "2014-01-01"
  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  registrar(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      this.contraInco('top')
      return;
    }
    
    var registrado: boolean = this.usuarioService.agregarUsuario(this.alumno.value);
    if (!registrado) {
      this.presentToast('middle');
      return;
    }

    this.regis();
    this.alumno.reset();
    this.verificar_password = '';
  }

  eliminar(rutEliminar){
    this.usuarioService.eliminarUsuario(rutEliminar);
  }

  buscar(rutBuscar){
    var alumnoEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.alumno.setValue(alumnoEncontrado);
    this.verificar_password = alumnoEncontrado.password;
  }

  modificar(){

      this.usuarioService.modificarUsuario(this.alumno.value);
      this.limpiar();

  }

  limpiar(){
    this.alumno.reset();
    this.verificar_password = '';
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };


  }

  clearRUT(rut) {
    return String(rut).replace(/[^0-9a-z]/gi, '');
  }

  getCheckDigit(rut) {
    const cleanRUT = this.clearRUT(rut)
    const reversedRUT = [...String(cleanRUT)].map(v => parseInt(v)).reverse()
    let result = 0
  
    for (let i = 0, j = 2; i < reversedRUT.length; i++, j < 7 ? j++ : j = 2) {
      result += reversedRUT[i] * j;
    }
  
    return (11 - (result % 11)) <= 9 ? String((11 - (result % 11))) : 'K'
  }


}
