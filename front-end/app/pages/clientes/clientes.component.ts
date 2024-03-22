import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog} from '@angular/material/dialog';
import { DialogCreateEditClienteComponent } from '../../components/dialog-create-edit-cliente/dialog-create-edit-cliente.component';
import { DialogAlertDeleteComponent } from '../../components/dialog-alert-delete/dialog-alert-delete.component';
import { ClienteServiceService } from '../../service/cliente-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [HeaderComponent, MatTableModule, MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule, HttpClientModule],
  providers: [ClienteServiceService, HttpClient],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  @Input() data: any[] = [];

  readonly displayedColumns = ['nmCliente', 'nmCidade', 'actions'];

  constructor(
    public dialog: MatDialog,
    public clienteServiceService: ClienteServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.length === 0) {
      this.clienteServiceService.getCliente().subscribe((clientes: any[]) => {
        this.data = clientes;
      });
    }
  }

  onAdd() {
    const dialogRef = this.dialog.open(DialogCreateEditClienteComponent, {
      data: { situation: 'new' }
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        this.clienteServiceService.getCliente().subscribe((clientes: any[]) => {
          this.data = clientes;
        });
      },
    })
  }

  onEdit(data: any) {
    const dialogRef = this.dialog.open(DialogCreateEditClienteComponent, {
      data: { idCliente: data.idCliente, nmCidade: data.nmCidade, nmCliente: data.nmCliente, situation: 'edit' },
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        setTimeout(() => {
           this.clienteServiceService.getCliente().subscribe((clientes: any[]) => {
            this.data = clientes;
          });
        }, 500)
      },
    })

  }

  onDelete(data: any) {
    const dialogRef = this.dialog.open(DialogAlertDeleteComponent, {
      data: 'Tem certeza que deseja remover esse cliente?',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          const response = await this.clienteServiceService.deleteCliente(data.idCliente).subscribe();
          if(response) {
            this.clienteServiceService.getCliente().subscribe((clientes: any[]) => {
              this.data = clientes;
            });
            this.snackBar.open('Cliente removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        } catch (error) {
          console.error('Erro ao excluir cliente:', error);
        }
      }
    });
  }
}
