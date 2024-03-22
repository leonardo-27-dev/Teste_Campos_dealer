import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClienteServiceService } from '../../service/cliente-service.service';
import { HttpClientModule } from '@angular/common/http';

export interface DialogData {
  idCliente: number;
  nmCliente: string;
  nmCidade: string;
  situation: string;
}

@Component({
  selector: 'app-dialog-create-edit-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ClienteServiceService],
  templateUrl: './dialog-create-edit-cliente.component.html',
  styleUrl: './dialog-create-edit-cliente.component.css',
})
export class DialogCreateEditClienteComponent {
  clienteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateEditClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public clienteServiceService: ClienteServiceService
  ) {
    this.clienteForm = this.formBuilder.group({
      nome: [data ? data.nmCliente : '', Validators.required],
      cidade: [data ? data.nmCidade : '', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  adicionarCliente(): void {
    if (this.clienteForm.valid) {
      let data = {
        nmCliente: this.clienteForm.value.nome,
        nmCidade: this.clienteForm.value.cidade,
      };

      if (this.data.situation === 'new') {
        this.clienteServiceService.createCliente(data).subscribe({
          next: (response) =>
            console.log('Usuário criado com sucesso:', response),
          error: (error) => console.error('Erro ao criar usuário:', error),
        });

        this.dialogRef.close();
      } else {
        let data = {
          idCliente: this.data.idCliente,
          nmCliente: this.clienteForm.value.nome,
          nmCidade: this.clienteForm.value.cidade,
        };
        this.clienteServiceService.editCliente(data).subscribe({
          next: (response) =>
            console.log('Usuário criado com sucesso:', response),
          error: (error) => console.error('Erro ao criar usuário:', error),
        });

        this.dialogRef.close();
      }
    }
  }
}
