import { CommonModule } from '@angular/common';
import {
  Component,
  Injector,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ITask } from '../../models/task.model';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<ITask[]>([]);

  filter = signal('all');
  taskByfilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  newTask = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  injector = inject(Injector);

  constructor() {}

  ngOnInit() {
    const storageTask = localStorage.getItem('tasks');
    if (storageTask) {
      this.tasks.set(JSON.parse(storageTask));
    }
    this.trackTask();
  }

  trackTask() {
    effect(
      () => {
        const tasks = this.tasks();
        console.log('run effect');
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }

  changeHandler() {
    const value = this.newTask.value.trim();

    if (this.newTask.valid && value != '') {
      this.addTask(value);
      this.newTask.reset();
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  changeHandlerCheck(task: ITask) {
    task.completed = !task.completed;
    this.tasks.update((prevTask) => {
      return prevTask.map((t) => {
        if (t.id === task.id) {
          return {
            ...task,
          };
        }
        return {
          ...t,
        };
      });
    }); 
  } 

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((_, position) => position !== index)
    );
  }

  updateTaskEditingMode(task: ITask) {
    this.tasks.update((prevTask) => {
      return prevTask.map((t) => {
        return {
          ...t,
          editing: t.id === task.id,
        };
      });
    });
  }

  updateTaskTitle(task: ITask, event: Event) {
    const input = event.target as HTMLInputElement;

    this.tasks.update((tasks) => {
      return tasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            title: input.value,
            editing: false,
          };
        }
        return {
          ...t,
        };
      });
    });
  }

  changeFilter(filter: string) {
    this.filter.set(filter);
  }
}
