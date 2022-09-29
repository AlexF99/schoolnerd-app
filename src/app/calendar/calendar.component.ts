import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/@shared/http.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  //data
  assignments: any;

  //calendar
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.listFilter('/assignment/all', {}).subscribe((data) => {
      this.assignments = data.body;
      this.events = this.assignments.map((a: any) => ({
        start: startOfDay(new Date(a.date)),
        title: `${a.title} - ${a.schoolClass.title}`,
      }));
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}
