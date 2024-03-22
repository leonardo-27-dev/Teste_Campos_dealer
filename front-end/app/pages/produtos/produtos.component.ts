import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProdutoServiceService } from '../../service/produto-service.service';
import { DialogCreateEditProdutoComponent } from '../../components/dialog-create-edit-produto/dialog-create-edit-produto.component';
import { DialogAlertDeleteComponent } from '../../components/dialog-alert-delete/dialog-alert-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [HeaderComponent, MatTableModule, MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule, HttpClientModule],
  providers: [ProdutoServiceService, HttpClient],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  @Input() data: any[] = [];

  readonly displayedColumns = ['dscProduto', 'vlrUnitario', 'actions'];

  constructor(
    public dialog: MatDialog,
    public produtoServiceService: ProdutoServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.length === 0) {
      this.produtoServiceService.getProdutos().subscribe((produtos: any[]) => {
        this.data = produtos;
      });
    }
  }

  onAdd() {
    const dialogRef = this.dialog.open(DialogCreateEditProdutoComponent, {
      data: { situation: 'new' }
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        this.produtoServiceService.getProdutos().subscribe((produtos: any[]) => {
          this.data = produtos;
        });
      },
    })
  }

  onEdit(data: any) {
    const dialogRef = this.dialog.open(DialogCreateEditProdutoComponent, {
      data: { idProduto: data.idProduto, dscProduto: data.dscProduto, vlrUnitario: data.vlrUnitario, situation: 'edit' },
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        setTimeout(() => {
           this.produtoServiceService.getProdutos().subscribe((produtos: any[]) => {
            this.data = produtos;
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
          const response = await this.produtoServiceService.deleteProduto(data.idProduto).subscribe();
          if(response) {
            this.produtoServiceService.getProdutos().subscribe((produtos: any[]) => {
              this.data = produtos;
            });
            this.snackBar.open('Produto removido com sucesso!', 'X', {
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
