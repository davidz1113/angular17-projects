
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = signal([
    'instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes',
  ]);

  person = signal({
    name: 'Andres',
    age: 28,
  });

  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  controlCtrl = new FormControl();
  widthCrtl = new FormControl(20, {
    nonNullable: true,
  });
  nameCrtl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });

  constructor() {
    this.controlCtrl.valueChanges.subscribe({
      next(value) {
        console.log(value);
      },
    });
  }
}
