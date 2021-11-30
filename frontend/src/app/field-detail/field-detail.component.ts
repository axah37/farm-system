import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Field, Task } from '../model/model';
import { BackendService } from '../backend.service';

class TaskModel {
  constructor(
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

  now = new Date();

  dataSource = new MatTableDataSource<Partial<Task>>();
  field: Field;
  displayedColumns: string[] = ['name', 'description', "date", 'completed',];
  model: TaskModel;
  @ViewChild("taskForm") taskForm: any;



  constructor(private route: ActivatedRoute, private backend: BackendService) {
    this.dataSource.data = [];
    this.field = {id: "", title: "", coords: "", tasks: []}
    this.model = new  TaskModel();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    const title = this.route.snapshot.params['title']
    this.fetchField(id)
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.backend.addTask(this.field.id, this.model).subscribe({
        next: (v) => { if (v.body !== null) this.fetchField(this.field.id) },
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

  private fetchField(id: string) {
    this.backend.getFieldById(id).subscribe({
      next: (v) => {
        if (v.body === null) {
          throw new Error("Field not found.")
        }
        console.log(v.body.tasks)
        this.field = v.body
        this.dataSource.data = []
        this.dataSource.data = v.body.tasks
      },
      error: (e) => console.log(e),
      complete: () => console.log("Completed")
    })
  }
  updateComplete(element: Task) {
    console.log(element)
    this.backend.updateTask(this.field.id, {...element, completed: !element.completed}).subscribe({
      next: (v) => { this.fetchField(this.field.id) },
      error: (e) => console.log(e),
      complete: () => console.log("Completed")
    })

    console.log(this.field)
  }

}
