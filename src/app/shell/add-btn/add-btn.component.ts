import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@app/@shared/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss'],
})
export class AddBtnComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private httpService: HttpService) {
    this.createForm();
  }

  ngOnInit() {}

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

    this.httpService.create('/school-class', this.addForm.value).subscribe((data) => console.log(data));
    this.addForm.reset();

    this.modalService.dismissAll();
  }
}
