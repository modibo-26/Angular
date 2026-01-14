import { Component } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap';
import { FaceSnapsService } from '../service/face-snaps.service';
import { Observable, throwIfEmpty } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-face-snap-list',
  imports: [
    FaceSnapComponent,
    AsyncPipe
  ],
  templateUrl: './face-snap-list.html',
  styleUrl: './face-snap-list.scss',
})
export class FaceSnapList {
  faceSnaps$!: Observable<FaceSnap[]>

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getFaceSnaps();
  }
}

