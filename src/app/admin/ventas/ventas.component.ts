import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { VentasHttp } from '../commons/http/ventas.http';
import { IVentas } from '../commons/interfaces/ventas.interface';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventasForm: FormGroup;
  dataSource: MatTableDataSource<IVentas>;
  displayedColumns: string[];
  VentasList: IVentas[] = [];
  labelAddOrEdit: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private ventasHttp: VentasHttp,
    private router: Router,
    private activatedRoute : ActivatedRoute,
  ) {
    this.ventasForm = this.fb.group({
      CVenta: [null],
      CEmpleado: [null, [Validators.required]],
      DFecha: [null, [Validators.required]],
    });
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'codigo',
      'empleado',
      'fecha',
      'editar',
      'eliminar'
    ];
  }

  ngOnInit(): void {
    this.getAllVentas();
  }

  getAllVentas(): void {
    console.log('getAllProducto')
    this.ventasHttp
      .getAll()
      .subscribe(res => {
        console.log('res', res)
        this.VentasList = res;
        this.dataSource = new MatTableDataSource(res);
      });
  }

  delete(codigo: number): void {
    const ventas = this.VentasList.filter(item => item.CVenta !== codigo);
    this.VentasList = ventas;
    this.dataSource = new MatTableDataSource(ventas);
  }

  edit(element: IVentas): void {
    console.log('element', element)
    this.labelAddOrEdit = 'Editar';
    this.ventasForm.setValue({
      CVenta: element.CVenta,
      CEmpleado: element.CEmpleado,
      DFecha: element.DFecha
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    if (this.ventasForm.valid) {
      console.log('save')
      const ventas = this.ventasForm.value as IVentas;
      console.log('ventas', ventas)
      if (ventas.CVenta) {
        // edit
        const ventasFound = this.VentasList.find(x => x.CVenta === ventas.CVenta);
        ventasFound.CEmpleado = ventas.CEmpleado;
        ventasFound.DFecha = ventas.DFecha;
        console.log('ventasFound', ventasFound);
        
      } else {
        // agrego
        const ids = this.VentasList.map(object => {
            return object.CVenta;
          });
        console.log(ids);
        
        const max = Math.max.apply(null,ids);
        ventas.CVenta = max +1;

        this.VentasList.push(ventas);
        this.dataSource = new MatTableDataSource(this.VentasList);

        // console.log('max', max);
        // console.log('ids', ids);
      }
    }
  }

  clear(): void {
    this.ventasForm.patchValue({
      CVenta: null,
      CEmpleado: null,
      DFecha: null
    });
    this.labelAddOrEdit = 'Agregar';
  }
}
