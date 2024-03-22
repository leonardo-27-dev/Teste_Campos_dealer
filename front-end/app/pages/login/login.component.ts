import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('container') container!: ElementRef;
  isSignUpActive: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngAfterViewInit() {
    const signUpButton = this.container.nativeElement.querySelector('#signUp');
    const signInButton = this.container.nativeElement.querySelector('#signIn');

    signUpButton.addEventListener('click', () => this.togglePanel(true));
    signInButton.addEventListener('click', () => this.togglePanel(false));
  }

  togglePanel(isSignUp: boolean) {
    this.isSignUpActive = isSignUp;
    const containerClassList = this.container.nativeElement.classList;
    isSignUp
      ? containerClassList.add('right-panel-active')
      : containerClassList.remove('right-panel-active');
  }

  createAccount(form: NgForm) {
    if (form.invalid) return;

    const { name, email, password } = form.value;
    this.authService.createUser(name, email, password).subscribe({
      next: (response) => {
        this.snackBar.open(`Conta Criado com Sucesso!`, 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error: (error) => {
        this.snackBar.open(`Ocorreu um erro! ${error}`, 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  signIn(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        const tokenString = response.token.tokenString;
        localStorage.setItem('token', `${tokenString}`);
        this.router.navigate(['clientes']);
        this.snackBar.open(`Login efetuado!`, 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error: (error) => {
        this.snackBar.open(`Login não efetuado! ${error}`, 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
