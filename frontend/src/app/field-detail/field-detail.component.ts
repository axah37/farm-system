import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { TaskTableComponent } from '../task-table/task-table.component';

class TaskModel {
  constructor(
    public id: string = "0",
    public taskName: string = "",
    public description: string = "",
    public completed: boolean = false,
    public dueDate: Date = new Date()) { }
}
@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.css']
})

export class FieldDetailComponent implements OnInit {

  title!: string
  id!: string
  model!: TaskModel;
  @ViewChild("taskForm") taskForm: any;
  @ViewChild(TaskTableComponent)
  tableComponent !: TaskTableComponent

  constructor(private route: ActivatedRoute, private backend: BackendService) {
    this.model = new  TaskModel();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.title = this.route.snapshot.params['title']
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.backend.addTask(this.id, this.model).subscribe({
        next: (v) => { this.tableComponent.getTasks() },
        error: (e) => console.log(e),
        complete: () => {
          console.log("Completed adding task")
          
        }
      })

      this.taskForm.reset()
      form.resetForm()

      this.model.dueDate = new Date()
    }
  }
}
