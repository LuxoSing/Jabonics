import { Component, OnInit } from '@angular/core';
import { TipoProducto } from '../../models/tipoProducto';

@Component({
  selector: 'app-tipoProducto',
  templateUrl: './tipoProducto.component.html',
  styleUrls: ['./tipoProducto.component.css']
})
export class TipoProductoComponent implements OnInit {

  TipoProductoArray: TipoProducto[] = [
    { CTipoProducto: 1, NTipoProducto: "Administrador"},
    { CTipoProducto: 2, NTipoProducto: "Contabilidad"},
    { CTipoProducto: 3, NTipoProducto: "Recursos Humanos"}
  ];

  selectedTipoProducto: TipoProducto = new TipoProducto();

  ngOnInit(): void { }

  addOrEdit(): void {
    //2 da version
    if (this.selectedTipoProducto.CTipoProducto === 0) {
      this.selectedTipoProducto.CTipoProducto = this.TipoProductoArray.length + 1;
      this.TipoProductoArray.push(this.selectedTipoProducto);
    }
    this.selectedTipoProducto = new TipoProducto();
  }

  openForEdit(TipoProducto: TipoProducto): void {
    this.selectedTipoProducto = TipoProducto;
  }
  delete(): void {
    if (confirm('¿Estás seguro que deseas eliminarlo?')) {
      this.TipoProductoArray = this.TipoProductoArray.filter(x => x != this.selectedTipoProducto);
      for (let i = 0; i < this.TipoProductoArray.length; i++) {
        if (i >= this.selectedTipoProducto.CTipoProducto - 1) {
          this.TipoProductoArray[i].CTipoProducto = this.TipoProductoArray[i].CTipoProducto - 1;
        }
        if (i < this.selectedTipoProducto.CTipoProducto) {
          this.TipoProductoArray[i].CTipoProducto = this.TipoProductoArray[i].CTipoProducto;
        }
      }
      this.selectedTipoProducto = new TipoProducto();
    }
  }

}
