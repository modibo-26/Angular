import { inject, Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { NewFaceSnap } from '../new-face-snap/new-face-snap';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  private http = inject(HttpClient)

  faceSnaps: FaceSnap[] = [
    
  ];

  getFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    const faceSnap = this.getFaceSnapById(faceSnapId)
    return faceSnap.pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
    );
  }
  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    const faceSnaps = this.getFaceSnaps();
    return faceSnaps.pipe(
      map(faceSnaps => [...faceSnaps].sort((a: FaceSnap, b: FaceSnap) => a.id - b.id)),
      map(sortedFaceSnaps => sortedFaceSnaps[sortedFaceSnaps.length -1]),
      map(previousFacenaps => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacenaps.id + 1
      })),
      switchMap(newFaceMap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceMap))
    )
  }
}