import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/@shared/data.service';
import { HttpService } from '@app/@shared/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myClasses: any;
  isLoading = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.list('/school-class').subscribe((data) => {
      this.myClasses = data.body;
    });
  }
}
