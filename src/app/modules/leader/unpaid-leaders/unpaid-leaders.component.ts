import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { Subscription } from 'rxjs';
// Models
import { Paginate } from 'src/app/modules/shared/models/paginate.model';
import { Leader } from '../models/leader.model';
// Services
import { LeaderService } from '../services/leader.service';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Component({
  selector: 'app-unpaid-leaders',
  templateUrl: './unpaid-leaders.component.html',
  styleUrls: ['./unpaid-leaders.component.scss']
})
export class UnpaidLeadersComponent implements OnInit {
  leaders: Leader[];
  paginate: Paginate = new Paginate();
  loading = true;
  event: PageChangedEvent;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private leaderService: LeaderService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.fetchLeaders(this.paginate.current_page);
  }

  fetchLeaders(pageNo = 1) {
    this.loading = true;
    this.leaderService
      .unpaidLeaders(pageNo)
      .then(successResponse => {
        this.loading = false;
        this.paginate = successResponse.data;
        this.leaders = this.paginate.data;
        if (this.leaders.length === 0 && this.paginate.current_page > 1) {
          this.fetchLeaders();
        }
      })
      .catch(errorResponse => {
        console.log(errorResponse);
      });
  }

}

