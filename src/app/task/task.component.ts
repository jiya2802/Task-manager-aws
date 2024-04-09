import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  websiteName: string = 'Task Manager';
  taskName: string = '';
  tasks: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.http.get<any[]>('https://fm1vzr9dn7.execute-api.eu-north-1.amazonaws.com/items').subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask() {
    const id = uuidv4()
    this.http.put('https://fm1vzr9dn7.execute-api.eu-north-1.amazonaws.com/items', { id, taskName: this.taskName }).subscribe(() => {
      this.getTasks();
      this.taskName = '';
    });
  }

  editTask(task: any) {
    console.log('Editing task:', task);
  }

  deleteTask(id: string) {
    this.http.delete(`https://fm1vzr9dn7.execute-api.eu-north-1.amazonaws.com/items/${id}`).subscribe(() => {
      this.getTasks();
    });
  }
}
