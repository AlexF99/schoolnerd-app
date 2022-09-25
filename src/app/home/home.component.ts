import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/@shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myClasses: any;
  isLoading = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.list('/school-class').subscribe((data) => (this.myClasses = data.body));
  }
}
