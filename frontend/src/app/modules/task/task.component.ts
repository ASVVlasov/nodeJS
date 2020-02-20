import {
  Component,
  OnInit
} from '@angular/core';
import {
  TaskService
} from 'src/app/services/task.service';
import {
  Task
} from 'src/app/models/task.model';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.pug',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskGroup: FormGroup;
  tasks: Task[];
  constructor(
    private taskService: TaskService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getTasks();
    this.taskGroup = this._fb.group({
      title: [],
      completed: []
    });
    this.taskService.onChangeTask().subscribe(({
      task,
      type
    }) => {
      if (type === 'addTask') {
        this.tasks.push(task);
        return;
      }
      if (type === 'deleteTask') {
        const index = this.tasks.findIndex(t => t._id === task._id);
        this.tasks.splice(index, 1);
        return;
      }
      this.tasks = this.tasks.map((t: Task) => {
        if (t._id === task._id) {
          return task;
        }
        return t;
      });
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onSubmit(value) {
    this.taskService.changeTask(value, 'addTask');
  }

  deleteTask(taskId: string) {
    this.taskService.changeTask(this.tasks.find(t => t._id === taskId), 'deleteTask');
  }

  updateTask(task: Task) {
    this.taskService.changeTask(task, 'updateTask');
  }

  patchTask(task: Task) {
    this.taskService.changeTask(task, 'patchTask');
  }

}