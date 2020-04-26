import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPasswordService } from '../../../core/services/auth/reset-password.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this._buildForm();
  }

  onSubmit() {
    if (this.isValid()) {
      const email = this.forgotPasswordForm.get('email').value;
      this.ngxSpinnerService.show();
      this.resetPasswordService.sendPasswordResetLink(email)
        .subscribe(
          data => {
            this.router.navigate(['/login']);
            this.ngxSpinnerService.hide();
          },
          error => {
            this.ngxSpinnerService.hide();
          }
        );
    }
  }

  private _buildForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.email],
    });
  }

  isValid() {
    return this.forgotPasswordForm.valid;
  }

  isValidField(field: string, fieldType?: string) {
    let valid = this.forgotPasswordForm.controls[field].errors;
    if (fieldType) {
      valid = this.forgotPasswordForm.controls[field].errors[fieldType];
    }
    return valid;
  }
}
