import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddNewFaceSnap() {
    this.router.navigateByUrl('/create');
  } 
}   
