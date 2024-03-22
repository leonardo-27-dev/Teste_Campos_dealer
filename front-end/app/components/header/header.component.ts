import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AutoFillServiceService } from '../../service/auto-fill-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  providers: [AutoFillServiceService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private autoFillServiceService: AutoFillServiceService, private snackBar: MatSnackBar) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  chamaAPiExterna() {
    const urlAtual = window.location.href;

    if (urlAtual.includes('/clientes')) {
      this.autoFillServiceService.getClientes().subscribe(
        (response) => {},
        (error) => {
          this.snackBar.open(`Ocorreu um erro! ${error}`, 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    } else if (urlAtual.includes('/produtos')) {
      this.autoFillServiceService.getProdutos().subscribe(
        (response) => {},
        (error) => {
          this.snackBar.open(`Ocorreu um erro! ${error}`, 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    } else if (urlAtual.includes('/vendas')) {
      this.autoFillServiceService.getVendas().subscribe(
        (response) => {},
        (error) => {
          this.snackBar.open(`Ocorreu um erro! ${error}`, 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    }
  }
}
