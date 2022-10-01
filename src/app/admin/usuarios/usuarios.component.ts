import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../commons/models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  UsuarioArray: Usuario[] = [
    { CUsuario: 1, NUsuario: "James", TContrasena: 123 },
    { CUsuario: 2, NUsuario: "Carl", TContrasena: 123 },
    { CUsuario: 3, NUsuario: "Mike", TContrasena: 123 },
    { CUsuario: 4, NUsuario: "Davis", TContrasena: 123 },
    { CUsuario: 5, NUsuario: "Franchesco El Malo", TContrasena: 123 },
    { CUsuario: 6, NUsuario: "Felix", TContrasena: 123 },
    { CUsuario: 7, NUsuario: "Luxo", TContrasena: 123 },
    { CUsuario: 8, NUsuario: "Ojitos", TContrasena: 123 }
  ];

  selectedUsuario: Usuario = new Usuario();

  ngOnInit(): void { }

  addOrEdit(): void {
    //2 da version
    if (this.selectedUsuario.CUsuario === 0) {
      this.selectedUsuario.CUsuario = this.UsuarioArray.length + 1;
      this.UsuarioArray.push(this.selectedUsuario);
    }
    this.selectedUsuario = new Usuario();
  }

  openForEdit(Usuario: Usuario): void {
    this.selectedUsuario = Usuario;
  }
  delete(): void {
    if (confirm('¿Estás seguro que deseas eliminarlo?')) {
      this.UsuarioArray = this.UsuarioArray.filter(x => x != this.selectedUsuario);
      for (let i = 0; i < this.UsuarioArray.length; i++) {
        if (i >= this.selectedUsuario.CUsuario - 1) {
          this.UsuarioArray[i].CUsuario = this.UsuarioArray[i].CUsuario - 1;
        }
        if (i < this.selectedUsuario.CUsuario) {
          this.UsuarioArray[i].CUsuario = this.UsuarioArray[i].CUsuario;
        }
      }
      this.selectedUsuario = new Usuario();
    }
  }

}
