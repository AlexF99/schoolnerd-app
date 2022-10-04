import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@app/@shared/http.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myClasses: any;
  isLoading = false;

  // form
  addForm!: FormGroup;
  isEditing: boolean = false;
  editedSclass: any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private httpService: HttpService) {
    this.createForm();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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

  open(content: any, sclass?: any) {
    if (sclass) {
      this.isEditing = true;
      this.editedSclass = sclass;
      this.addForm = this.formBuilder.group({
        title: [sclass.title, Validators.required],
        minGrade: [sclass.minGrade, Validators.required],
      });
    } else {
      this.isEditing = false;
      this.editedSclass = null;
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

  save(sclass?: any) {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.httpService.update(`/school-class/${sclass.id}`, this.addForm.value).subscribe(() => this.loadData());
    } else {
      this.httpService
        .create('/school-class', this.addForm.value)
        .subscribe((data) => (this.myClasses = [...this.myClasses, data.body]));
    }

    this.addForm.reset();
    this.modalService.dismissAll();
  }

  deleteClass(schoolclass: any) {
    this.httpService.remove(`/school-class/${schoolclass.id}`).subscribe(() => this.loadData());
  }
}
