import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FutplayPage } from './futplay.page';
import { AutoLoginGuard } from 'src/app/guards/auto-login.guard';
import { ReservacionesGuard } from 'src/app/guards/reservaciones.guard';
import { MiPerfilGuard } from 'src/app/guards/mi-perfil.guard';
import { PerfilEquipoGuard } from 'src/app/guards/perfil-equipo.guard';
 
const routes: Routes = [

  {
    path: '',
    component: FutplayPage,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mis-reservaciones',
      },
      {
        path:'reservaciones',
        loadChildren: () => import('../reservaciones/reservaciones.module').then( m => m.ReservacionesPageModule), canLoad:[ReservacionesGuard]
      },
      {
        path:'mi-perfil',
        loadChildren: () => import('../mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule), canLoad:[MiPerfilGuard]
      },
      
      {
        path:'perfil-equipo',
        loadChildren: () => import('../perfil-equipo/perfil-equipo.module').then( m => m.PerfilEquipoPageModule), canLoad:[PerfilEquipoGuard]
      },
      {
        path:'rivales',
        loadChildren: () => import('../rivales/rivales.module').then( m => m.RivalesPageModule)
      },
 
     {
        path:'mis-equipos',
        loadChildren: () => import('../mis-equipos/mis-equipos.module').then( m => m.MisEquiposPageModule) 
      },
      {
        path:'torneos',
        loadChildren: () => import('../torneos/torneos.module').then( m => m.TorneosPageModule) 
      },
      {
        path:'crear-unirse-equipo',
        loadChildren: () => import('../crear-unirse-equipo/crear-unirse-equipo.module').then( m => m.CrearUnirseEquipoPageModule)
      },
       
      {
        path:'notificaciones',
        loadChildren: () => import('../notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FutplayPageRoutingModule {}
