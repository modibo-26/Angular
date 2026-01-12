import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.scss',
})



export class FaceSnapComponent implements OnInit {
 @Input() faceSnap!: FaceSnap
  
  snapButtonText!: string;
  userHasSnapped!: boolean;

  ngOnInit(): void {
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

  onSnap(): void {
    if (this.userHasSnapped) {
      this.faceSnap.removeSnap();
      this.snapButtonText = 'Oh Snap!';
    } else {
      this.faceSnap.addSnap();
      this.snapButtonText = 'Oops, unSnap!';
    }
    this.userHasSnapped = !this.userHasSnapped;
  }
}