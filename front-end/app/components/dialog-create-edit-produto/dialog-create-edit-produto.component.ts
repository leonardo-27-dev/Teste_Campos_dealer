import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';


import { ProdutoServiceService } from '../../service/produto-service.service';


export interface DialogData {
  idProduto: number;
  dscProduto: string;
  vlrUnitario: string;
  situation: string;
}

@Component({
  selector: 'app-dialog-create-edit-produto',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProdutoServiceService],
  templateUrl: './dialog-create-edit-produto.component.html',
  styleUrl: './dialog-create-edit-produto.component.css'
})
export class DialogCreateEditProdutoComponent {
  produtoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateEditProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public produtoServiceService: ProdutoServiceService
  ) {
    this.produtoForm = this.formBuilder.group({
      dscProduto: [data ? data.dscProduto : '', Validators.required],
      vlrUnitario: [data ? data.vlrUnitario : '', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  adicionarProduto(): void {
    if (this.produtoForm.valid) {
      let data = {
        dscProduto: this.produtoForm.value.dscProduto,
        vlrUnitario: parseFloat(this.produtoForm.value.vlrUnitario.replace(',', '.'))
      };

      if (this.data.situation === 'new') {
        this.produtoServiceService.createProduto(data).subscribe({
          next: (response) =>
            console.log('Usuário criado com sucesso:', response),
          error: (error) => console.error('Erro ao criar usuário:', error),
        });

        this.dialogRef.close();
      } else {
        let data = {
          idProduto: this.data.idProduto,
          dscProduto: this.produtoForm.value.dscProduto,
          vlrUnitario: parseFloat(this.produtoForm.value.vlrUnitario.replace(',', '.'))
        };
        this.produtoServiceService.editProduto(data).subscribe({
          next: (response) =>
            console.log('Usuário criado com sucesso:', response),
          error: (error) => console.error('Erro ao criar usuário:', error),
        });

        this.dialogRef.close();
      }
    }
  }
}
