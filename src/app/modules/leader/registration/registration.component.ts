import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { LeaderFormService } from '../services/leader-form.service';
import { LeaderService } from '../services/leader.service';

// Models
import { Leader } from '../models/leader.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  leaderForm: FormGroup;
  leader: Leader = new Leader();
  image; File;
  buttonClicked: Boolean = false;
  @ViewChild('fileInput', {static: false}) fileInput;

  constructor(
    private router: Router,
    private leaderFormService: LeaderFormService,
    private leaderService: LeaderService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.leaderForm = this.leaderFormService.createForm(this.leader);
  }

  create() {
    this.buttonClicked = true;
    this.leaderService
      .create(this.leaderForm.value, this.image)
      .then(response => {
        this.toastr.showMessage(response.body.message);
        this.router.navigate([AppRoutes.leader]);
      })
      .catch(errorResponse => {
        console.log(errorResponse);
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

  uploadPicture() {
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.image = fileToUpload;
    }
  }

}
