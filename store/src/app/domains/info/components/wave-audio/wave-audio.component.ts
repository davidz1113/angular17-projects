import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  input,
  signal,
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css',
})
export class WaveAudioComponent implements AfterViewInit {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave') waveDiv!: ElementRef;

  private ws!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit(): void {
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.waveDiv.nativeElement,
    });
    this.ws.on('play', ()=>{
      this.isPlaying.set(true);
    })
    this.ws.on('pause', ()=>{
      this.isPlaying.set(false);
    })
  }

  btnPlayPause() {
    this.ws.playPause();
  }
}
