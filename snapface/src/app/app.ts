import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { delay, interval, map, mergeMap, of, take, tap } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  // redTrainsCalled = 0;
  // yellowTrainsCalled = 0;

  // ngOnInit() {
  //   interval(500).pipe(
  //     take(10),
  //     map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
  //     tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
  //     mergeMap(color => this.getTrainObservable$(color)),
  //     tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
  //   ).subscribe();
  // }

  // getTrainObservable$(color: 'rouge' | 'jaune') {
  //   const isRedTrain = color === 'rouge';
  //   isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
  //   const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
  //   console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
  //   return of({ color, trainIndex }).pipe(
  //     delay(isRedTrain ? 5000 : 6000)
  //   );
  // }

  // translateColor(color: 'rouge' | 'jaune') {
  //   return color === 'rouge' ? 'red' : 'yellow';
  // }

}
