import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoProductoComponent } from './tipoProducto/tipoProducto.component';
import { YtsSweetAlertModule } from '../commons/services/sweet-alert/sweet-alert.module';
import { ProductoComponent } from './producto/producto.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AdminHttpModule } from './commons/http/http.module';
import {MatSelectModule} from '@angular/material/select';

const ANGULAR_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

const COMPONENTS = [
  AdminComponent,
  HomeComponent,
  UsuariosComponent,
  TipoProductoComponent,
  ProductoComponent
];

const MATERIAL_MODULES = [
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ANGULAR_MODULES,
    AdminRoutingModule,
    MATERIAL_MODULES,
    YtsSweetAlertModule,
    AdminHttpModule
  ]
})
export class AdminModule { }
