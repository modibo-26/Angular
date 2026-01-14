import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

  userEmail!: string;

  constructor(private router: Router) { }

  onContinue() {
    this.router.navigateByUrl('facesnaps');
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
}

}
