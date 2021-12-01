import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Field, Task } from '../model/model';
import { BackendService } from '../backend.service';
import { MatPaginator } from '@angular/material/paginator';

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

export class FieldDetailComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Partial<Task>>();
  field: Field;
  displayedColumns: string[] = ['name', 'description', "date", 'completed', "delete"];
  model: TaskModel;
  @ViewChild("taskForm") taskForm: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;




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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
        this.field = v.body
        this.dataSource.data = []
        this.dataSource.data = v.body.tasks
      },
      error: (e) => console.log(e),
      complete: () => console.log("Completed")
    })
  }

  updateComplete(element: Task) {
    this.backend.updateTask(this.field.id, {...element, completed: !element.completed}).subscribe({
      next: (v) => { this.fetchField(this.field.id) },
      error: (e) => console.log(e),
      complete: () => console.log("Completed")
    })
  }

  deleteTask(taskId: string){
    this.backend.deleteTask(this.field.id, taskId).subscribe({
      next: (v) => { this.fetchField(this.field.id)},
      error:(e) => console.log(e),
      complete: () => console.log("Completed")
    })
  }

  isOverdue(dueDate: string){
    const date = new Date(dueDate).getTime()
    return new Date().getTime() - (24 * 60 * 60 * 1000) > date
  }

}
