import { Component, Input, OnInit } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';
import { ModalController } from '@ionic/angular';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-filtro-ubicacion',
  templateUrl: './filtro-ubicacion.page.html',
  styleUrls: ['./filtro-ubicacion.page.scss'],
})
export class FiltroUbicacionPage implements OnInit {
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
  }
  @Input() Cod_Provincia:number;
  @Input() Cod_Canton:number ;
  @Input() Cod_Distrito:number;
  constructor(
    public provinciasService:ProvinciasService,
    public cantonesService:CantonesService,
    public distritosService:DistritosService,
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService

  ) { }

  ngOnInit(

  ) {
    this.filtro.Cod_Provincia = this.Cod_Provincia;
    this.filtro.Cod_Canton = this.Cod_Canton;
    this.filtro.Cod_Distrito = this.Cod_Distrito;
    this.provinciasService.syncProvincias();
  }
  onChangeProvincias($event){
  
    this.filtro.Cod_Provincia = $event.target.value;
    this.filtro.Cod_Canton = null;
    this.filtro.Cod_Distrito = null;
    this.cantonesService.cantones = [];
    this.distritosService.distritos = [];
 if(this.filtro.Cod_Provincia){
  this.cantonesService.syncCantones(this.filtro.Cod_Provincia).then(resp =>{

this.cantonesService.cantones = resp.slice(0);

  })
 }else{

 }
  }

  onChangeCantones($event){

    this.filtro.Cod_Canton = $event.target.value;
    this.filtro.Cod_Distrito = null;
    this.distritosService.distritos = [];
if(this.filtro.Cod_Provincia && this.filtro.Cod_Canton){
  this.distritosService.syncDistritos(this.filtro.Cod_Canton).then(resp =>{
    this.distritosService.distritos = resp.slice(0);

    
  })
}

  }

  onChangeDistritos($event){

    this.filtro.Cod_Distrito = $event.target.value;

  }
  onChange($event , provincia, canton, distrito){
    if(provincia){
  
   this.cantonesService.syncCantones($event.target.value);
    }else if(canton){
  
      this.distritosService.syncDistritos( $event.target.value);
  
    }
    console.log($event.target.value);
    }
  submit(){
  
    this.equiposService.syncfiltrarEquipos( this.filtro
    ).then(equipos=>{
      this.equiposService.equipos = equipos;
this.cerrarModal();

    })
  }

  limpiarDatos(){
    this.filtro ={
      Cod_Provincia: null,
      Cod_Canton: null,
      Cod_Distrito:null,
    }
    this.equiposService.syncListaEquiposToPromise( this.usuariosService.usuarioActual.Cod_Usuario
      ).then(equipos=>{
        this.equiposService.equipos = equipos;
  this.cerrarModal();
  
      })
  }
  onOpenMenu(cancha){

  }
 

  cerrarModal(){
    this.modalCtrl.dismiss(this.modalCtrl.dismiss({
      'Cod_Provincia': this.filtro.Cod_Provincia,
      'Cod_Canton':this.filtro.Cod_Canton,
      'Cod_Distrito':this.filtro.Cod_Distrito
    }));
  }


}
