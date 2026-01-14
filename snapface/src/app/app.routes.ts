import { Routes } from '@angular/router';
import { FaceSnapList } from './face-snap-list/face-snap-list';
import { LandingPage } from './landing-page/landing-page';
import { SingleFaceSnap } from './single-face-snap/single-face-snap';
import { NewFaceSnap } from './new-face-snap/new-face-snap';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'facesnaps', component: FaceSnapList },
    { path: 'facesnaps/:id', component: SingleFaceSnap },
    { path: 'create', component: NewFaceSnap },
];