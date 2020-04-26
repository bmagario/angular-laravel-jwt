// Angular imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../core/services/auth/reset-password.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'reset-link.component.html',
  styleUrls: ['reset-link.component.scss']
})
export class ResetLinkComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hidePassword: boolean;
  resetToken: null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    this.route.queryParams.subscribe(params => {
      this.resetToken = params.token;
    });
    this.hidePassword = true;
  }

  ngOnInit() {
    this._buildForm();
  }

  /**
   * Request to reset password
   */
  onSubmit() {
    if (this.isValid()) {
      const email = this.resetPasswordForm.get('email').value;
      const password = this.resetPasswordForm.get('newPassword').value;
      this.ngxSpinnerService.show();
      this.resetPasswordService.resetPassword(email, password, this.resetToken)
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

  /**
   * Check if new password and confirm password are equals
   * @param form Form
   */
  private _checkPasswords(form: FormGroup) {
    const pass = form.get('newPassword');
    const confirmPass = form.get('repeatNewPassword');
    return pass.value !== confirmPass.value
      ? confirmPass.setErrors([{repeatNewPassword: true}])
      : confirmPass.setErrors(null);
  }

  private _buildForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.email],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    }, { validator: this._checkPasswords });
  }

  isValid() {
    return this.resetPasswordForm.valid;
  }

  isValidField(field: string, fieldType?: string) {
    let valid = this.resetPasswordForm.controls[field].errors;
    if (fieldType) {
      valid = this.resetPasswordForm.controls[field].errors[fieldType];
    }
    return valid;
  }
}
