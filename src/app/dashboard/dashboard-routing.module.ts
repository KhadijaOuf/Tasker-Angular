import { CalendarComponent } from './../shared/calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // { path: '', redirectTo: '(sidebar:board)', pathMatch: 'full' }, // Default sidebar route
  { path: 'board', component: BoardComponent, outlet: 'sidebar' },
  { path: 'calendar', component: CalendarComponent, outlet: 'sidebar' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
