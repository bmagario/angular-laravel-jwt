// Angular imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '@core/services/auth/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this._buildForm();
  }

  onSubmit() {
    if (this.isValid()) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      const captcha = this.loginForm.get('recaptchaReactive').value;
      this.ngxSpinnerService.show();
      this.authenticationService.login(username, password, captcha)
      .subscribe(
        data => {
          this.router.navigate(['']);
          this.ngxSpinnerService.hide();
        },
        error => {
          this.ngxSpinnerService.hide();
        }
      );
    }
  }

  private _buildForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
      recaptchaReactive: [null, Validators.required]
    });
  }

  isValid() {
    // return !(
    //   this.loginForm.invalid &&
    //   (this.loginForm.dirty || this.loginForm.touched)
    // );
    return true;
  }

  isValidField(field: string, fieldType?: string) {
    // let valid = !(this.loginForm.controls[field].invalid &&
    // (this.loginForm.controls[field].dirty ||	this.loginForm.controls[field].touched));
    // if (fieldType !== undefined && this.loginForm.controls[field].errors) {
    //   valid = !(this.loginForm.controls[field].errors[fieldType]);
    // }
    // return valid;
    return true;
  }
}
