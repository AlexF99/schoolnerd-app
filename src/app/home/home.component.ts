import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/@shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUserInfo().subscribe((data) => console.log(data.body));
  }
}
