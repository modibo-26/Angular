import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {


  urlRegex!: RegExp
  loginForm!: FormGroup;
  errorMessage = ''
  

  private router = inject(Router)
  
  private cdr = inject(ChangeDetectorRef)

  private service = inject(AuthService)

  private formBuilder = inject(FormBuilder)


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmitForm(): void {
    this.service.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(result => {
      if (result === false) {
        this.errorMessage = 'email ou mot de passe incorrect';
        this.cdr.detectChanges();
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

}
