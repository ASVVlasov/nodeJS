import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  ) { }

  ngOnInit() {
    this.getTasks();
    this.taskGroup = this._fb.group({
      title: [],
      completed: []
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onSubmit(value) {
    this.taskService.addTask(value).subscribe((task: Task) => {
      this.tasks.push(task);
    });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => this.getTasks());
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe((newTask: Task) => task = newTask);
  }

  patchTask(task: Task) {
    this.taskService.patchTask(task).subscribe((newTask: Task) => task = newTask);
  }

}
