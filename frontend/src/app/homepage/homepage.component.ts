import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Field } from '../model/model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  areas: Field[] = []

  title = 'farm-manager-ng';

  constructor(private router: Router, private backend: BackendService) {
  }

  goToFieldDetail(title: string, id: string) {
    console.log(title)
    this.router.navigate([`/field-detail/${title}`, { title: title, id: id }])
  }

  ngOnInit(): void {
    this.backend.getFields().subscribe({
      next: (v) => this.areas = v.body || [],
      error: (e) => console.log(e),
      complete: () => console.log("complete")
    })
  }
}