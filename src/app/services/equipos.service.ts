import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Equipos } from '../models/equipos';
import { PerfilEquipos } from '../models/perfilEquipos';
import { AlertasService } from './alertas.service';
import { HistorialPartidoEquipos } from '../models/historialPartidoEquipo';
import { CantonesService } from './cantones.service';
import { ProvinciasService } from './provincias.service';
import { DistritosService } from './distritos.service';
import { Provincias } from '../models/provincias';
import { Cantones } from '../models/cantones';
import { Distritos } from '../models/distritos';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
misEquipos:PerfilEquipos[]=[]
equipos:PerfilEquipos[]=[]
equipo:PerfilEquipos;
mostrarEquipos:PerfilEquipos[]=[]
dataProvincias = [];
dataCantones = [];
dataDistritos = [];
showCanton = null;
showDistrito = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    public alertasService: AlertasService,
    public cantonesService:CantonesService,
    public provinciasService:ProvinciasService,
    public distritosService:DistritosService
  ) { }
  reload:boolean = false;
// GET  METHODS

  getURL( api: string ){

    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
      
    }
  const URL = environment.preURL  + test +  environment.postURL + api;


    return URL;
  }

  private getMisEquipos( Cod_Usuario){
    let URL = this.getURL( environment.getMisEquiposURL);
        URL = URL + Cod_Usuario

        console.log(URL, 'URL ')
    return this.http.get<PerfilEquipos[]>( URL );
  }
  private getPerfilEquipo( codEquipo:number){
    let URL = this.getURL( environment.getPerfilEquipo);
        URL = URL + codEquipo

        console.log(URL, 'URL ')
    return this.http.get<PerfilEquipos[]>( URL );
  }
  syncGetPerfilEquipoToPromise(codEquipo:number){

    return this.getPerfilEquipo(codEquipo).toPromise();
  
    
    }
  private getListaEquipos(Cod_Usuario ){
    let URL = this.getURL( environment.getListaEquiposURL);
    URL= URL + Cod_Usuario;
        console.log(URL, 'URL')
    return this.http.get<PerfilEquipos[]>( URL );
  }


  private putAvatar(avatars){


    let URL = this.getURL(environment.putEquiposAvatarURL);
     URL = URL + avatars.Cod_Equipo
    const options   = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        
      }
    };
  
  console.log('URL',URL,avatars, 'put avatars', JSON.stringify(avatars))
  
    return this.http.put(URL,avatars, options);
  
  
  }

  syncAvatarToPromise(avatars){

    return this.putAvatar(avatars).toPromise();
   }

  private getClasificacionEquipos(){
    let URL = this.getURL( environment.getClasificacionEquiposURL);

        console.log(URL, 'URL')
    return this.http.get<PerfilEquipos[]>( URL );
  }


  syncMisEquiposToPromise(Cod_Usuario){

  return this.getMisEquipos(Cod_Usuario).toPromise();

  
  }




  syncListaEquiposToPromise(Cod_Usuario){

  return this.getListaEquipos(Cod_Usuario).toPromise();

  
  }
 

  syncClasificacionEquiposToPromise(){

    return this.getClasificacionEquipos().toPromise();
  
    
    }


// POST METHODS


private postEquipo (equipo){
  
  const URL = this.getURL( environment.postEquipoURL );
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
  console.log(URL, 'URL')
  return this.http.post( URL, JSON.stringify(equipo), options );
}

private postDurezaEquipo (historialPartido:HistorialPartidoEquipos){
  
  let URL = this.getURL( environment.postDurezaEquipoURL );
  URL = URL + historialPartido.Cod_Equipo
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
  console.log(URL, 'URL')
  return this.http.post( URL, JSON.stringify(historialPartido), options );
}



private getFiltroEquipos(filtro:any ){
  let URL = this.getURL( environment.getFiltroEquiposURL);
URL = URL+filtro.Cod_Provincia+'/'+filtro.Cod_Canton+'/'+filtro.Cod_Distrito
      console.log(URL, 'URL')
  return this.http.get<PerfilEquipos[]>( URL );
}


syncfiltrarEquipos(filtro:any){

  return this.getFiltroEquipos(filtro).toPromise();

  
  }

syncPostDurezaEquipo(historialPartido:HistorialPartidoEquipos){
  console.log('historialPartido', historialPartido)
   return  this.postDurezaEquipo(historialPartido).toPromise();
  
  }
  

syncPostEquipoToPromise(equipo:Equipos){
console.log('equipo', equipo)
 return  this.postEquipo(equipo).toPromise();

}


private imagePost(data, Cod_Equipo){


  let URL = this.getURL(environment.postFotoCanchaURL);
   URL = URL + Cod_Equipo
  const options   = {
    headers: {
      'enctype': 'multipart/form-data;',
      'Accept': 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
      
    }
  };

console.log('URL',URL,data, 'data post image', JSON.stringify(data))

  return this.http.post(URL,data, options);


}


syncimagePost(data, Cod_Equipo){

 return this.imagePost(data, Cod_Equipo).toPromise();
  
}


// PUT  METHODS

  private    putEquipo( equipo  , Cod_Equipo){

    let URL = this.getURL( environment.putEquipoURL);
     URL = URL +Cod_Equipo  ;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, equipo, options );
  }

  
  putEquipoToPromise(equipo, Cod_Equipo  ){


   
      
   return this.putEquipo( equipo, Cod_Equipo ).toPromise();
  }


  private    putEquipoEstado( Cod_Equipo){

    let URL = this.getURL( environment.putCanchaEstadoURL);
        URL = URL + Cod_Equipo;
    const options = {
      
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 console.log('put', URL)
    return this.http.put( URL, options );
  }


  syncPutCanchaEstado(Cod_Equipo){

    return this.putEquipoEstado(Cod_Equipo).toPromise();
  }



  // DELETE  METHODS

  private   deleteEquipo(Cod_Equipo ){

    let URL = this.getURL( environment.deleteEquipoURL);
        URL = URL  + Cod_Equipo;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      } 
    };
 
    return this.http.delete( URL, options );
  }

  syncDeleteEquipo(Cod_Equipo){

    return this.deleteEquipo(Cod_Equipo).toPromise();

  }
  generateItems() {
    const count = this.mostrarEquipos.length;
    for (let i = count; i < this.equipos.length; i++) {
      if(i < count + 10){
        this.mostrarEquipos.push(this.equipos[i]);
      }
    }
  }




  async cargarDAtosUbicacion(){
    let provincias = await this.provinciasService.syncProvinciasPromise();

    provincias.forEach(async (provincia:Provincias, index)=>{
   
  let data  = {
    id : provincia.Cod_Provincia,
    valor: provincia.Provincia
  }
  console.log(data,'data')
  this.dataProvincias.push(data)
      if(index == provincias.length -1){



          
  let cantones = await this.cantonesService.syncCantonesToPromise(this.equipo.equipo.Cod_Provincia);
  if(cantones.length == 0) this.alertasService.loadingDissmiss();
    cantones.forEach((canton:Cantones, index)=>{
   
  let data  = {
    id : canton.Cod_Canton,
    valor: canton.Canton
  }
  console.log(data,'data')
  this.dataCantones.push(data)
      if(index == cantones.length -1){
        this.showCanton = true;
        this.showDistrito = null;
        this.distritosService.syncDistritos( this.equipo.equipo.Cod_Canton).then(distritos =>{
          if(distritos.length == 0) this.alertasService.loadingDissmiss();
          distritos.forEach((distrito:Distritos, index)=>{
         
            let data  = {
              id : distrito.Cod_Distrito,
              valor: distrito.Distrito
            }
            console.log(data,'data')
            this.dataDistritos.push(data)
                if(index == distritos.length -1){
             //     this.distritosService.distritos = resp.slice(0);
                  this.showDistrito = true;
                  this.alertasService.loadingDissmiss();
                }
              })
        
         
          
        })
      }



    })
  
         
      }

    })
  }
}
