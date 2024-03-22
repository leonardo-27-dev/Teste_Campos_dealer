import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DialogAlertDeleteComponent } from '../../components/dialog-alert-delete/dialog-alert-delete.component';
import {
  DialogCreateEditVendaComponent,
} from '../../components/dialog-create-edit-venda/dialog-create-edit-venda.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ClienteServiceService } from '../../service/cliente-service.service';
import { ProdutoServiceService } from '../../service/produto-service.service';
import { VendaServiceService } from '../../service/venda-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [HeaderComponent, MatTableModule, MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule, HttpClientModule],
  providers: [VendaServiceService, HttpClient, ProdutoServiceService, ClienteServiceService],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.css'
})
export class VendasComponent {
  @Input() data: any[] = [];
  @Input() clientes: any[] = [];
  @Input() produtos: any[] = [];

  readonly displayedColumns = ['nmCliente', 'nmProduto', 'qtdVenda', 'vlrUnitarioVenda', 'dthVenda', 'vlrTotalVenda', 'actions'];

  constructor(
    public dialog: MatDialog,
    public vendaServiceService: VendaServiceService,
    public clienteServiceService: ClienteServiceService,
    public produtoServiceService: ProdutoServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.length === 0) {
      this.vendaServiceService.getVendas().subscribe((vendas: any[]) => {
        this.data = vendas;
      });
    }
  }

  onAdd() {
    const dialogRef = this.dialog.open(DialogCreateEditVendaComponent, {
      data: { situation: 'new' }
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        this.vendaServiceService.getVendas().subscribe((vendas: any[]) => {
          this.data = vendas;
        });
      },
    })
  }

  onEdit(data: any) {
    const dialogRef = this.dialog.open(DialogCreateEditVendaComponent, {
      data: { idVenda: data.idVenda, idCliente: data.idCliente, idProduto: data.idProduto, qtdVenda: data.qtdVenda, vlrUnitarioVenda: data.vlrUnitarioVenda, dthVenda: data.dthVenda, vlrTotalVenda: data.vlrTotalVenda, situation: 'edit' },
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        setTimeout(() => {
           this.vendaServiceService.getVendas().subscribe((vendas: any[]) => {
            this.data = vendas;
          });
        }, 500)
      },
    })

  }

  onDelete(data: any) {
    const dialogRef = this.dialog.open(DialogAlertDeleteComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          const response = await this.vendaServiceService.deleteVenda(data.idVenda).subscribe();
          if(response) {
            this.vendaServiceService.getVendas().subscribe((vendas: any[]) => {
              this.data = vendas;
            });

            this.snackBar.open('Venda removida com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        } catch (error) {
          this.snackBar.open('Erro ao excluir cliente', 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      }
    });
  }

  formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const hora = parseInt(hours) - 3;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hora.toString().padStart(2, '0')}:${minutes}`;
  }

}
