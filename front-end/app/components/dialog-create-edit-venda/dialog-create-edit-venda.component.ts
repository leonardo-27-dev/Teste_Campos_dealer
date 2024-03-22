import { Component, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProdutoServiceService } from '../../service/produto-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClienteServiceService } from '../../service/cliente-service.service';
import { MatSelectModule } from '@angular/material/select';
import {
  DateAdapter,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { VendaServiceService } from '../../service/venda-service.service';

export interface DialogData {
  idVenda: number;
  idCliente: number;
  idProduto: number;
  qtdVenda: string;
  vlrUnitarioVenda: number;
  dthVenda: string;
  vlrTotalVenda: number;
  situation: string;
}

@Component({
  selector: 'app-dialog-create-edit-venda',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    VendaServiceService,
    ProdutoServiceService,
    ClienteServiceService,
    HttpClient,
    { provide: DateAdapter, useClass: NativeDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'input',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD/MM/YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
  templateUrl: './dialog-create-edit-venda.component.html',
  styleUrl: './dialog-create-edit-venda.component.css',
})
export class DialogCreateEditVendaComponent {
  vendaForm: FormGroup;

  @Input() clientes: any[] = [];
  @Input() produtos: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogCreateEditVendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public produtoServiceService: ProdutoServiceService,
    public clienteServiceService: ClienteServiceService,
    public vendaServiceService: VendaServiceService
  ) {
    this.vendaForm = this.formBuilder.group({
      idCliente: [data ? data.idCliente : '', Validators.required],
      idProduto: [data ? data.idProduto : '', Validators.required],
      qtdVenda: [data ? data.qtdVenda : '', Validators.required],
      vlrUnitarioVenda: [
        data ? data.vlrUnitarioVenda : '',
        Validators.required,
      ],
      dthVenda: [data ? data.dthVenda : '', Validators.required],
      vlrTotalVenda: [data ? data.vlrTotalVenda : '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clienteServiceService.getCliente().subscribe((clientes: any[]) => {
      this.clientes = clientes;
    });

    this.produtoServiceService.getProdutos().subscribe((produtos: any[]) => {
      this.produtos = produtos;
    });
  }

  calcularTotal() {
    const qtdVenda = this.vendaForm.value.qtdVenda;
    const vlrUnitarioVenda = this.vendaForm.value.vlrUnitarioVenda;
    const total = qtdVenda * vlrUnitarioVenda;
    this.vendaForm.patchValue({ vlrTotalVenda: total });
  }

  close(): void {
    this.dialogRef.close();
  }

  adicionarProduto(): void {
    let data = {
      idCliente: this.vendaForm.value.idCliente,
      idProduto: this.vendaForm.value.idProduto,
      qtdVenda: parseInt(this.vendaForm.value.qtdVenda),
      vlrUnitarioVenda: parseFloat(`${this.vendaForm.value.vlrUnitarioVenda}`.replace(',', '.')),
      dthVenda: this.vendaForm.value.dthVenda,
      vlrTotalVenda: parseFloat(`${this.vendaForm.value.vlrTotalVenda}`.replace(',', '.')),
    };

    if (this.data.situation === 'new') {
      this.vendaServiceService.createVenda(data).subscribe({
        next: (response) =>
          console.log('Produto criado com sucesso:', response),
        error: (error) => console.error('Erro ao criar produto:', error),
      });

      this.dialogRef.close();
    } else {
      let data = {
        idVenda: this.data.idVenda,
        idCliente: this.vendaForm.value.idCliente,
        idProduto: this.vendaForm.value.idProduto,
        qtdVenda: parseInt(this.vendaForm.value.qtdVenda),
        vlrUnitarioVenda: parseFloat(`${this.vendaForm.value.vlrUnitarioVenda}`.replace(',', '.')),
        dthVenda: this.vendaForm.value.dthVenda,
        vlrTotalVenda: parseFloat(`${this.vendaForm.value.vlrTotalVenda}`.replace(',', '.')),
      };
      this.vendaServiceService.editVenda(data).subscribe({
        next: (response) =>
          console.log('Produto editado com sucesso:', response),
        error: (error) => console.error('Erro ao editar produto:', error),
      });

      this.dialogRef.close();
    }
  }

}
