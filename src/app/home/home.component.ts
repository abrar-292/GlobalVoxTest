import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CSHelper} from '../helper';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  SignupForm: FormGroup;
  SpaceRegex = /^\S*$/;
  submitted = false;
  confirmNotMatch = false;
  localData = [];
  displayedColumns: string[] = ['position', 'first_name', 'last_name', 'email', 'gender', 'date_of_birth', 'action'];
  data = [];


  constructor(private fb: FormBuilder, private helper: CSHelper) {
    this.SignupForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern(this.SpaceRegex)]],
      last_name: ['', [Validators.required, Validators.pattern(this.SpaceRegex)]],
      email: ['', [Validators.required, Validators.pattern(/^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/)]],
      gender: [''],
      date_of_birth: [''],
      password: ['', [Validators.required, this.helper.spaceValidator, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.helper.spaceValidator]],
    });
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 15, 2, 1);
  }

  ngOnInit(): void {
    this.getData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.SignupForm.valid) {
      if (this.SignupForm.controls.password.value === this.SignupForm.controls.confirmPassword.value) {
        this.data.push({
          first_name: this.SignupForm.controls.first_name.value,
          last_name: this.SignupForm.controls.last_name.value,
          email: this.SignupForm.controls.email.value,
          gender: this.SignupForm.controls.gender.value,
          date_of_birth: this.SignupForm.controls.date_of_birth.value,
        });
        localStorage.setItem('data', JSON.stringify(this.data));
        this.submitted = false;
        this.SignupForm.reset();
      } else {
        alert(`Password and confirm password doesn't match`);
        console.log(this.confirmNotMatch);
      }
      this.getData();
    }
  }

  deleteData(position) {
    const item = JSON.parse(localStorage.getItem('data'));
    item.splice(position - 1, 1);
    localStorage.setItem('data', JSON.stringify(item));
    this.getData();
  }

  getData() {
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data'));
      this.data.map((re, i) => {
        re.position = i + 1;
        re.date_of_birth = moment(re.date_of_birth).format('DD-MM-YYYY');
      });
    }
  }
}
