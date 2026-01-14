import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { CurrencyPipe, DatePipe, DecimalPipe, LowerCasePipe, NgClass, NgStyle, PercentPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../service/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [ 
    UpperCasePipe
  ],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.scss',
})



export class FaceSnapComponent {
 @Input() faceSnap!: FaceSnap
 
  constructor(private router: Router) {}
  

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}