import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../backend.service';
import { Field, Task } from '../model/model';

type Row = Partial<Task> & { fieldId: string, fieldTitle: string }

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit, AfterViewInit {

  @Input() fieldId!: string
  dataSource = new MatTableDataSource<Partial<Row>>();
  displayedColumns: string[] = ['field', 'name', 'description', "date", 'completed', "delete"];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private backend: BackendService) {
    this.dataSource.data = [];
  }

  ngOnInit(): void {
    this.getTasks()
    console.log(this.fieldId)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateComplete(element: Row) {
    const e = element as Task
    this.backend.updateTask(element.fieldId, { id: e.id, taskName: e.taskName, description: e.description, dueDate: e.dueDate, completed: !e.completed }).subscribe({
      next: (v) => { this.getTasks() },
      error: (e) => console.log(e),
      complete: () => console.log("Completed")
    })
  }

  deleteTask(element: Row) {
    const e = element as Task
    this.backend.deleteTask(element.fieldId, e.id).subscribe({
      next: (v) => { this.getTasks() },
      error: (e) => console.log(e),
      complete: () => console.log("Completed")
    })
  }

  isOverdue(dueDate: string) {
    const date = new Date(dueDate).getTime()
    return new Date().getTime() - (24 * 60 * 60 * 1000) > date
  }

  getTasks() {
    this.backend.getFields().subscribe({
      next: (v) => {
        if (v.body === null) {
          console.log("Fields cannot be found")
        }
        else {
          const rows: Row[] = []
          v.body.map((element) => {
            element.tasks.forEach((t) => {
              if(this.fieldId === undefined){
                rows.push({ fieldId: element.id, fieldTitle: element.title, ...t })
              } else {
                if(element.id === this.fieldId)
                  rows.push({ fieldId: element.id, fieldTitle: element.title, ...t })
              }
            })
          })
          this.dataSource.data = rows
        }
      },
      error: (e) => console.log(e),
      complete: () => console.log("Complete")
    })
  }

}
