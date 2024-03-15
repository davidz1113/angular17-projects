import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent implements OnChanges {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';

  counter = signal(0);
  counterIntervalRef: number | undefined;

  constructor() {
    //No Sync, before render
    //una vez
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
    // console.log(duration);
  }

  ngOnInit() {
    //After render
    //una vez
    //async, then, subs, etc
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration => ', this.duration);
    console.log('message => ', this.message);

    this.counterIntervalRef = window.setInterval(() => {
      this.counter.update((statePrev) => statePrev + 1);
      console.log(this.counter());
    }, 1000);
  }

  ngAfterViewInit() {
    // after render
    // hijos ya fueron renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterIntervalRef);
    //Comentario para probar lo mejor del teclado portatil , es muy bueno y practico para cualquier tipo de actividades como programar
    // y escribir, estoy muy feliz de todo esto
  }

  doSomething() {
    console.log('duration');
  }
}
