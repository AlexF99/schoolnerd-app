import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@app/@shared/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myClasses: any;
  isLoading = false;

  addForm!: FormGroup;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private httpService: HttpService) {
    this.createForm();
  }

  ngOnInit() {
    this.httpService.list('/school-class').subscribe((data) => {
      this.myClasses = data.body;
    });
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      minGrade: ['', Validators.required],
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  save() {
    if (!this.addForm.valid) return;

    this.httpService
      .create('/school-class', this.addForm.value)
      .subscribe((data) => (this.myClasses = [...this.myClasses, data.body]));
    this.addForm.reset();

    this.modalService.dismissAll();
  }
}
