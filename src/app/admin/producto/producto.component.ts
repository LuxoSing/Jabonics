import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoHttp } from '../commons/http/producto.http';
import { TipoProductoHttp } from '../commons/http/tipo-producto.http';
import { IProducto } from '../commons/interfaces/producto.interface';
import { ITipoProducto } from '../commons/interfaces/tipo-producto.interface';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productoForm: FormGroup;
  dataSource: MatTableDataSource<IProducto>;
  displayedColumns: string[];
  productoList: IProducto[] = [];
  TipoProductoList: ITipoProducto[] = [];
  labelAddOrEdit: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private productoHttp: ProductoHttp,
    private tipoProductoHttp: TipoProductoHttp,
    private router: Router,
    private activatedRoute : ActivatedRoute,
  ) {
    this.productoForm = this.fb.group({
      CProducto: [null],
      NProducto: [null, [Validators.required]],
      CTipoProducto: [null, [Validators.required]]
    });
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'nro',
      'codigo',
      'nombre',
      'tipoproducto',
      'precio',
      'editar',
      'eliminar'
    ];
  }

  ngOnInit(): void {
    this.getAllProducto();
    this.getAllTipoProducto();
  }

  getAllProducto(): void {
    console.log('getAllProducto')
    this.productoHttp
      .getAll()
      .subscribe(res => {
        console.log('res', res)
        this.productoList = res;
        this.dataSource = new MatTableDataSource(res);
      });
  }

  getAllTipoProducto(): void {
    this.tipoProductoHttp
      .getAll()
      .subscribe(res => {
        console.log('getAllTipoProducto', res)
        this.TipoProductoList = res;
      });
  }

  delete(codigo: number): void {
    const productos = this.productoList.filter(item => item.CProducto !== codigo);
    this.productoList = productos;
    this.dataSource = new MatTableDataSource(productos);
  }

  edit(element: IProducto): void {
    console.log('element', element)
    this.labelAddOrEdit = 'Editar';
    this.productoForm.setValue({
      CProducto: element.CProducto,
      NProducto: element.NProducto,
      CTipoProducto: element.CTipoProducto
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    if (this.productoForm.valid) {
      console.log('save')
      const producto = this.productoForm.value as IProducto;
      console.log('producto', producto)
      if (producto.CProducto) {
        // edito
        const productoFound = this.productoList.find(x => x.CProducto === producto.CProducto);
        productoFound.NProducto = producto.NProducto;
        productoFound.CTipoProducto = producto.CTipoProducto;
        productoFound.NTipoProducto = this.TipoProductoList.find(x => x.CTipoProducto === producto.CTipoProducto).NTipoProducto;
        productoFound.MPrecio = producto.MPrecio;

        console.log('productoFound', productoFound);
      } else {
        // agrego
        producto.NTipoProducto = this.TipoProductoList.find(x => x.CTipoProducto === producto.CTipoProducto).NTipoProducto;
        this.productoList.push(producto);
        this.dataSource = new MatTableDataSource(this.productoList);
      }
    }
  }

  clear(): void {
    this.productoForm.patchValue({
      CProducto: null,
      NProducto: null,
      CTipoProducto: null
    });
    this.labelAddOrEdit = 'Agregar';
  }

  // goToViewDetail(id: number): void {
  //   this.router.navigate(['../dish-detail', id], {relativeTo: this.activatedRoute});
  // }
}
