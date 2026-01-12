import { Component, OnInit, signal } from '@angular/core';
import { FaceSnap } from './models/face-snap';
import { RouterOutlet } from '@angular/router';
import { FaceSnapComponent } from './face-snap/face-snap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FaceSnapComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('snapface');
  mySnap!: FaceSnap;


  ngOnInit() {
    this.mySnap = new FaceSnap(
      'Archibald',
      'Mon meilleur ami depuis tout petit !',
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      new Date(),
      10
    );
  }
}
