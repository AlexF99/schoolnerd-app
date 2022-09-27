import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/@shared/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss'],
})
export class SchoolClassComponent implements OnInit {
  myClass: any;
  assignments: any;

  addForm!: FormGroup;
  classId: string = '';

  isEditing: boolean = false;
  editedAssignment: any;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.classId = this.route.snapshot.params['id'];
    this.httpService.find('/school-class', this.classId).subscribe((data) => (this.myClass = data.body));
    this.httpService
      .listFilter('/assignment', { schoolClass: this.classId })
      .subscribe((data) => (this.assignments = data.body));
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      grade: '',
      weight: '',
      date: ['', Validators.required],
    });
  }

  open(content: any, assignment?: any) {
    if (assignment) {
      this.isEditing = true;
      this.editedAssignment = assignment;
      this.addForm = this.formBuilder.group({
        title: [assignment.title, Validators.required],
        grade: assignment.grade ? assignment.grade : '',
        weight: assignment.weight ? assignment.weight : '',
        date: [assignment.date, Validators.required],
      });
    } else {
      this.isEditing = false;
      this.editedAssignment = null;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  save(assignment?: any) {
    if (!this.addForm.valid) return;

    const newAssignment = {
      schoolClass: this.classId,
      ...this.addForm.value,
    };
    if (this.isEditing) {
      this.httpService.update(`/assignment/${assignment.id}`, newAssignment).subscribe((data) => {});
    } else {
      this.httpService
        .create('/assignment', newAssignment)
        .subscribe((data) => (this.assignments = [...this.assignments, data.body]));
    }

    this.addForm.reset();

    this.modalService.dismissAll();
  }
}
