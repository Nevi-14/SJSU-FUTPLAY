import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/usuarios';
import { AlertasService } from 'src/app/services/alertas.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';
import { Provincias } from 'src/app/models/provincias';
import { Cantones } from 'src/app/models/cantones';
import { Distritos } from 'src/app/models/distritos';
import { ValidacionFormularioPipe } from 'src/app/pipes/validacion-formulario.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  usuario: Usuarios = {
    Cod_Usuario: null,
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Posicion: 1,
    Cod_Role: 3,
    Modo_Customizado: false,
    Foto: 'user.svg',
    Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Fecha_Nacimiento: new Date(),
    Telefono: '',
    Correo: '',
    Contrasena: '',
    Intentos: 0,
    Peso: 0,
    Estatura: 0,
    Apodo: '',
    Partidos_Jugados: 0,
    Partidos_Jugador_Futplay: 0,
    Partidos_Jugador_Del_Partido: 0,
    Compartir_Datos: false,
    Avatar: true,
    Pais: 'CR',
    Cod_Pais: '+506'
  };
  ingresarContrasena = '';
  provincia = null;
  canton: null;
  distrito: null;
  showCanton = null;
  showDistrito = null;
  modalOpen: boolean = false;
  dataProvincias = [];
  dataCantones = [];
  dataDistritos = [];
  enviarFormulario: boolean = false;
  Cod_Provincia = null;
  Cod_Canton = null;
  Cod_Distrito = null;

  countries = [];
  states = [];
  cities = [];
  Zip_Code = [];
  Country_Code = '';
  constructor(
    public usuariosServicio: UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCrtl: ModalController,
    public alertasService: AlertasService,
    public http:HttpClient
  ) { }

  ionViewWillEnter() {

    this.limpiarDatos()
    this.loadCountries();
    
    
  }
  loadCountries(){
    this.getCountries().toPromise().then( (paises:any[])=>{
      console.log('paises', paises)
      paises.forEach( pais =>{
        let data = {
          id: pais.id,
          valor: pais.name
        }
this.countries.push(data)

      })
    })
  }
  private getCountries (){
    let URL = 'https://api.countrystatecity.in/v1/countries/IN/states/MH/cities';
    URL = URL 
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*', 
          'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='  
}
    };
    return this.http.get( URL, options);
  }




private getStates(){
  let URL = `https://api.countrystatecity.in/v1/countries/${this.Country_Code}/states`;
  URL = URL 
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='  
}
  };
  return this.http.get( URL, options);

}
loadStates(){
  this.getStates().toPromise().then( (states:any[])=>{
    console.log('states', states)
    states.forEach( pais =>{
      let data = {
        id: pais.id,
        valor: pais.name
      }
this.states.push(data)

    })
  })
}








  async limpiarDatos() {

    this.provinciasService.syncProvinciasPromise().then(provincias => {
      provincias.forEach((provincia: Provincias, index) => {

        let data = {
          id: provincia.Cod_Provincia,
          valor: provincia.Provincia
        }
        console.log(data, 'data')
        this.dataProvincias.push(data)
        if (index == provincias.length - 1) {

          this.usuario = {
            Cod_Usuario: null,
            Cod_Provincia: null,
            Cod_Canton: null,
            Cod_Distrito: null,
            Cod_Posicion: 1,
            Cod_Role: 3,
            Modo_Customizado: false,
            Foto: 'user.svg',
            Nombre: '',
            Primer_Apellido: '',
            Segundo_Apellido: '',
            Fecha_Nacimiento: new Date(),
            Telefono: '',
            Correo: '',
            Contrasena: '',
            Intentos: 0,
            Peso: 0,
            Estatura: 0,
            Apodo: '',
            Partidos_Jugados: 0,
            Partidos_Jugador_Futplay: 0,
            Partidos_Jugador_Del_Partido: 0,
            Compartir_Datos: false,
            Avatar: true,
            Pais: 'CR',
            Cod_Pais: '+506'
          };
          this.showCanton = null;
          this.showDistrito = null;

        }
      })

    }, error => {
      this.limpiarDatos();
    })




  }


  async seleccionarFecha() {
    if (!this.modalOpen) {
      this.modalOpen = true;
      const modal = await this.modalCrtl.create({
        component: SeleccionarFechaPage,
        breakpoints: [0, 0.3, 0.5, 0.8],
        initialBreakpoint: 0.5,
        cssClass: 'medium-modal',
        mode: 'ios',
        componentProps: {
          title: 'Fecha de nacimiento',
          id: 'seleccionar-fecha',
          fecha: new Date(this.usuario.Fecha_Nacimiento)
        }
      })
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if (data !== undefined) {
        this.usuario.Fecha_Nacimiento = data.date
        this.modalOpen = false;
      } else {
        this.modalOpen = false;
      }
    }

  }


  async registro(fRegistro: NgForm) {
    let registro = fRegistro.value;
    let continuar = await ValidacionFormularioPipe.prototype.transform(fRegistro);
    if (!continuar) return this.alertasService.message('FUTPLAY', 'Todos los campos son obligatorios!');
    this.enviarFormulario = true;
    this.usuario.Cod_Provincia = Number(registro.Cod_Provincia)
    this.usuario.Cod_Canton = Number(registro.Cod_Canton)
    this.usuario.Cod_Distrito = Number(registro.Cod_Distrito)
    this.usuario.Nombre = registro.Nombre
    this.usuario.Primer_Apellido = registro.Primer_Apellido
    this.usuario.Telefono = registro.Telefono
    this.usuario.Correo = registro.Correo
    this.ingresarContrasena = registro.password;
    this.usuario.Contrasena = this.ingresarContrasena;
    this.usuario.Cod_Pais = this.usuario.Pais == 'CR' ? '+506' : '+1';
    this.usuariosServicio.registro(this.usuario)

  }


  async onChangeProvincias(fRegistro: NgForm) {
    let registro = fRegistro.value;
    if (this.enviarFormulario) return
    this.alertasService.presentaLoading('Cargando datos...')

    this.dataCantones = []

    this.cantonesService.cantones = [];
    this.distritosService.distritos = [];
    if (registro.Cod_Provincia) {

      let cantones = await this.cantonesService.syncCantonesToPromise(registro.Cod_Provincia);
      if (cantones.length == 0) this.alertasService.loadingDissmiss();
      cantones.forEach((canton: Cantones, index) => {

        let data = {
          id: canton.Cod_Canton,
          valor: canton.Canton
        }
        this.dataCantones.push(data)
        if (index == cantones.length - 1) {
          this.showCanton = true;
          this.showDistrito = null;
          this.alertasService.loadingDissmiss();
        }
      })

    } else {
      this.alertasService.loadingDissmiss();
    }
  }
  onChangeCantones(fRegistro: NgForm) {
    let registro = fRegistro.value;
    if (this.enviarFormulario) return
    this.alertasService.presentaLoading('Cargando datos...')
    this.dataDistritos = [];
    this.distritosService.distritos = [];
    if (registro.Cod_Provincia && registro.Cod_Canton) {
      this.distritosService.syncDistritos(registro.Cod_Canton).then(distritos => {
        if (distritos.length == 0) this.alertasService.loadingDissmiss();
        distritos.forEach((distrito: Distritos, index) => {

          let data = {
            id: distrito.Cod_Distrito,
            valor: distrito.Distrito
          }
          this.dataDistritos.push(data)
          if (index == distritos.length - 1) {
            this.showDistrito = true;
            this.alertasService.loadingDissmiss();
          }
        })



      })
    } else {
      this.alertasService.loadingDissmiss();
    }

  }








}
