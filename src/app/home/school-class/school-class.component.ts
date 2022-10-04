import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/@shared/http.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss'],
})
export class SchoolClassComponent implements OnInit {
  classId: string = '';

  // data
  myClass: any;
  assignments: any;

  // form
  addForm!: FormGroup;
  isEditing: boolean = false;
  editedAssignment: any;

  // analytics
  average: number = 0;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.classId = this.route.snapshot.params['id'];
    this.httpService.find('/school-class', this.classId).subscribe((data) => (this.myClass = data.body));
    this.httpService.listFilter('/assignment', { schoolClass: this.classId }).subscribe((data) => {
      this.assignments = data.body;
      this.average = this.getAverage(this.assignments);
    });
  }

  getAverage(assignments: any): number {
    const sumGrades = assignments.reduce((acc: any, current: any) => {
      return acc + (current.grade && current.weight ? current.grade * current.weight : 0);
    }, 0);
    const sumWeights = assignments.reduce((acc: any, current: any) => {
      return acc + (current.grade && current.weight ? current.weight : 0);
    }, 0);

    return sumWeights !== 0 ? sumGrades / sumWeights : 0;
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
        date: [new Date(assignment.date).toLocaleString(), Validators.required],
      });
    } else {
      this.isEditing = false;
      this.editedAssignment = null;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        if (reason === ModalDismissReasons.ESC || reason === ModalDismissReasons.BACKDROP_CLICK) {
          this.addForm.reset();
        }
      }
    );
  }

  save(assignment?: any) {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const newAssignment = {
      schoolClass: this.classId,
      ...this.addForm.value,
    };
    if (this.isEditing) {
      this.httpService.update(`/assignment/${assignment.id}`, newAssignment).subscribe(() => this.loadData());
    } else {
      this.httpService
        .create('/assignment', newAssignment)
        .subscribe((data) => (this.assignments = [...this.assignments, data.body]));
    }

    this.addForm.reset();
    this.dismiss();
  }

  deleteAssignment(assignment?: any) {
    this.httpService.remove(`/assignment/${assignment.id}`).subscribe(() => this.loadData());
  }

  dismiss() {
    this.addForm.reset();
    this.modalService.dismissAll();
  }
}
