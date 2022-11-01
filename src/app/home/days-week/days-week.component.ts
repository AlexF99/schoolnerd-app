import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-days-week',
  templateUrl: './days-week.component.html',
  styleUrls: ['./days-week.component.scss'],
})
export class DaysWeekComponent implements OnInit {
  @Output() newDayEvent = new EventEmitter<any>();
  @Input() daysWeek: any;

  // form
  addForm!: FormGroup;
  isEditing: boolean = false;

  daysOfWeek: any = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  // state
  showDates: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.addForm = this.formBuilder.group({
      day: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      classRoom: [''],
    });
  }

  save() {
    if (!this.addForm.valid) return;
    if (this.daysWeek.find((day: any) => day.day.toString() === this.addForm.value.day.toString())) return;
    this.newDayEvent.emit(this.addForm.value);
  }
}
