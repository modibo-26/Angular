import { Component, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from '../service/face-snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './single-face-snap.html',
  styleUrl: './single-face-snap.scss',
})
export class SingleFaceSnap {
// faceSnap!: FaceSnap;
faceSnap$!: Observable<FaceSnap>
snapButtonText!: string;
userHasSnapped!: boolean;

constructor(private faceSnapsService: FaceSnapsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getFaceSnap();

    this.prepareInterface();
  }

  onSnap(faceSnapId: number): void {
  if (this.userHasSnapped) {
      this.unSnap(faceSnapId);
    } else {
      this.snap(faceSnapId);
    }
  }
  
  snap(faceSnapId: number) {
    this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
      tap(() => this.snapButtonText = 'Oops, unSnap!')
    );
  }
  
  unSnap(faceSnapId: number) {
    this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
      tap(() => this.snapButtonText = 'Oh Snap!')
    );
  }
  
  private getFaceSnap() {
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  private prepareInterface() {
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }
}
