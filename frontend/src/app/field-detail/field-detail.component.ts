import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

class Task {
  constructor(public id: string = "1",
    public taskName: string = "",
    public description: string = "",
    public fieldId: string = "",
    public completed: boolean = false,
    public dueDate: Date = new Date()) { }
}

interface Field {
  id: string,
  name: string,
}

@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.css']
})

export class FieldDetailComponent implements OnInit {

  now = new Date();

  dataSource = new MatTableDataSource<Partial<Task>>();
  tasks: Task[];
  field: Field;
  displayedColumns: string[] = ['name', 'description', "date", 'completed',];
  model: Task = new Task();
  @ViewChild("taskForm") taskForm: any;



  constructor(private route: ActivatedRoute, private router: Router) {
    this.field = { id: "", name: "" };
    this.tasks = [];
    this.dataSource.data = this.tasks;
  }

  ngOnInit(): void {
    this.field = { id: "id2", name: this.route.snapshot.params['title'] }
    console.log(this.tasks)
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.tasks.push({ ...this.model, id: "123", fieldId: this.field.id })

      this.taskForm.reset()
      form.resetForm()
      this.model.dueDate = new Date()

      this.dataSource.data = this.tasks
    }
  }

  updateComplete(id: string) {
    let i = this.tasks.findIndex((t) => {
      return t.id === id
    });

    if (i === -1) {
      console.error("Task not found")
    } else {
      this.tasks[i].completed = !this.tasks[i].completed;
    }
  }

}
