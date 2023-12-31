import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesEnviadasJugadoresPageRoutingModule } from './solicitudes-enviadas-jugadores-routing.module';

import { SolicitudesEnviadasJugadoresPage } from './solicitudes-enviadas-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesEnviadasJugadoresPageRoutingModule
  ],
  declarations: [SolicitudesEnviadasJugadoresPage]
})
export class SolicitudesEnviadasJugadoresPageModule {}
