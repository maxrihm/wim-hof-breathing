// src/app/timer/timer.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  breathInTime: number = 4; // Time for breathing in
  breathOutTime: number = 6; // Time for breathing out
  totalDuration: number = 60; // Total duration of the breathing session in seconds
  currentPhase: string = 'Breath In';
  timeLeft: number = this.breathInTime;
  elapsed: number = 0; // Time elapsed in the current phase
  interval: any;
  isRunning: boolean = false;
  visualScale: number = 1; // Scale for animation
  sessionTimeLeft: number = this.totalDuration;

  startTimer() {
    this.isRunning = true;
    this.currentPhase = 'Breath In';
    this.elapsed = 0;
    this.timeLeft = this.breathInTime;
    this.sessionTimeLeft = this.totalDuration;
    this.runTimer();
  }

  runTimer() {
    const step = () => {
      if (this.sessionTimeLeft <= 0) {
        this.stopTimer();
        return;
      }

      this.updateVisualScale();
      this.elapsed += 0.016; // Increment for smooth animation, ~60fps
      this.sessionTimeLeft -= 0.016;

      if (this.elapsed >= this.timeLeft) {
        this.switchPhase();
        this.elapsed = 0;
      }

      if (this.isRunning) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
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
    const progress = this.elapsed / this.timeLeft;
    if (this.currentPhase === 'Breath In') {
      this.visualScale = 1 + 0.5 * Math.sin(progress * Math.PI); // Gradually increase to 1.5
    } else {
      this.visualScale = 1.5 - 0.5 * Math.sin(progress * Math.PI); // Gradually decrease back to 1
    }
  }

  stopTimer() {
    this.isRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.currentPhase = 'Breath In';
    this.timeLeft = this.breathInTime;
    this.sessionTimeLeft = this.totalDuration;
    this.visualScale = 1;
    this.elapsed = 0;
  }
}
