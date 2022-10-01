import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  UsuarioArray: Usuario[] = [
    {CUsuario: 1, NUsuario: "James", TContrasena: 123},
    {CUsuario: 2, NUsuario: "Carl", TContrasena: 123},
    {CUsuario: 3, NUsuario: "Mike", TContrasena: 123}//cambiar
   ];

   selectedUsuario: Usuario = new Usuario();

   ngOnInit(): void {}

   addOrEdit(): void {
    //2 da version
    if(this.selectedUsuario.CUsuario === 0){
      this.selectedUsuario.CUsuario= this.UsuarioArray.length + 1;
      this.UsuarioArray.push(this.selectedUsuario);  
    }
    this.selectedUsuario = new Usuario();

    /* Así se nace con estas tres lineas de codigo el metodo
    this.selectedEstudent.id= this.estudentsArray.length +1;
    this.estudentsArray.push(this.selectedEstudent);
    this.selectedEstudent = new Estudents();
    */
  }

  openForEdit(Usuario: Usuario): void {
    this.selectedUsuario = Usuario;
  }
  delete(): void {
    if (confirm('¿Estás seguro que deseas eliminarlo?')) {
      this.UsuarioArray = this.UsuarioArray.filter( x => x != this.selectedUsuario);
      this.selectedUsuario = new Usuario();
    }
  }

}
