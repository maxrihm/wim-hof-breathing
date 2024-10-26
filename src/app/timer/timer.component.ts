// src/app/timer/timer.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  breathInTime: number = 4; // Time for breathing in, in seconds
  breathOutTime: number = 6; // Time for breathing out, in seconds
  totalDuration: number = 60; // Total duration of the breathing session, in seconds
  currentPhase: string = 'Breath In';
  elapsed: number = 0; // Time elapsed in the current phase
  interval: any;
  isRunning: boolean = false;
  visualScale: number = 1; // Scale for animation
  minScale: number = 1; // Minimum scale for animation
  maxScale: number = 1.5; // Maximum scale for animation
  sessionTimeLeft: number = this.totalDuration;

  startTimer() {
    this.isRunning = true;
    this.currentPhase = 'Breath In';
    this.elapsed = 0;
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

      if (this.elapsed >= this.getCurrentPhaseTime()) {
        this.switchPhase();
        this.elapsed = 0;
      }

      if (this.isRunning) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  getCurrentPhaseTime(): number {
    return this.currentPhase === 'Breath In' ? this.breathInTime : this.breathOutTime;
  }

  switchPhase() {
    if (this.currentPhase === 'Breath In') {
      this.currentPhase = 'Breath Out';
    } else {
      this.currentPhase = 'Breath In';
    }
  }

  updateVisualScale() {
    const progress = this.elapsed / this.getCurrentPhaseTime();
    if (this.currentPhase === 'Breath In') {
      // Gradually increase from minScale to maxScale
      this.visualScale = this.minScale + (this.maxScale - this.minScale) * progress;
    } else {
      // Gradually decrease from maxScale to minScale
      this.visualScale = this.maxScale - (this.maxScale - this.minScale) * progress;
    }
  }

  getElapsedMilliseconds(): number {
    // Return the elapsed time in the current phase, in milliseconds
    return Math.floor(this.elapsed * 1000);
  }

  stopTimer() {
    this.isRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.currentPhase = 'Breath In';
    this.visualScale = this.minScale;
    this.sessionTimeLeft = this.totalDuration;
    this.elapsed = 0;
  }
}
