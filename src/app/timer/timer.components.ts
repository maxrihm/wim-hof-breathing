
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  breathInTime: number = 4; // Time for breathing in
  breathOutTime: number = 6; // Time for breathing out
  currentPhase: string = 'Breath In';
  timeLeft: number = this.breathInTime;
  interval: any;
  isRunning: boolean = false;
  visualScale: number = 1; // Scale for animation

  startTimer() {
    this.isRunning = true;
    this.currentPhase = 'Breath In';
    this.timeLeft = this.breathInTime;
    this.runTimer();
  }

  runTimer() {
    this.interval = setInterval(() => {
      this.updateVisualScale();
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.switchPhase();
      }
    }, 1000);
  }

  switchPhase() {
    if (this.currentPhase === 'Breath In') {
      this.currentPhase = 'Breath Out';
      this.timeLeft = this.breathOutTime;
    } else {
      this.currentPhase = 'Breath In';
      this.timeLeft = this.breathInTime;
    }
  }

  updateVisualScale() {
    if (this.currentPhase === 'Breath In') {
      this.visualScale = 1 + (0.5 * (1 - this.timeLeft / this.breathInTime));
    } else {
      this.visualScale = 1.5 - (0.5 * (1 - this.timeLeft / this.breathOutTime));
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.isRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.currentPhase = 'Breath In';
    this.timeLeft = this.breathInTime;
    this.visualScale = 1;
  }
}
