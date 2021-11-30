import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldDetailComponent } from './field-detail/field-detail.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [{ path: 'field-detail/:title', component: FieldDetailComponent }, { path: '', component: HomepageComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
