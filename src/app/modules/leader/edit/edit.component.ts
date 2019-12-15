import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { LeaderFormService } from '../services/leader-form.service';
import { LeaderService } from '../services/leader.service';
// Models
import { Leader } from '../models/leader.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  leaderForm: FormGroup;
  leader: Leader = new Leader();
  image; File;
  buttonClicked: Boolean = false;
  @ViewChild('fileInput', {static: false}) fileInput;
  returnPage: number = 1;
  sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaderFormService: LeaderFormService,
    private leaderService: LeaderService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.leader = data.leader.data;
        this.sub = this.route.queryParams.subscribe(params => {
          this.returnPage = params['returnPage'];
        });
        this.leaderForm = this.leaderFormService.createForm(this.leader);
      });
  }

  edit() {
    this.buttonClicked = true;
    this.leaderService
      .update(this.leaderForm.value, this.image)
      .then(response => {
        this.toastr.showMessage(response.body.message);
        this.router.navigate([AppRoutes.leader], { queryParams: { page: this.returnPage }});
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
