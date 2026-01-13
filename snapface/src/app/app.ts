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
  faceSnaps!: FaceSnap[];

  ngOnInit(): void {
    this.faceSnaps = [
      new FaceSnap(
        'Archibald',
        'Mon meilleur ami depuis toujours !',
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
        new Date(),
        10
      ),
      new FaceSnap(
        'Three Rock Mountain',
        'Un endroit magnifique pour les randonnées.',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
        new Date(),
        6
      ),
      new FaceSnap(
        'Un bon repas',
        'Mmmh que c\'est bon !',
        'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
        new Date(),
        156
      )
    ];
    this.faceSnaps[1].setLocation('à la montagne');
  }
}
