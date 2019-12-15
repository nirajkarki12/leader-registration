import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { Subscription } from 'rxjs';
// Models
import { Paginate } from 'src/app/modules/shared/models/paginate.model';
import { Leader } from '../models/leader.model';
import { LeaderSearchParam } from '../models/LeaderSearchParam.model';
// Services
import { LeaderService } from '../services/leader.service';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  leaders: Leader[];
  paginate: Paginate = new Paginate();
  loading = true;
  event: PageChangedEvent;
  sub: Subscription;
  filterParam = new LeaderSearchParam();
  delay = 500;


  isCollapsed: boolean = true;
  iconCollapse: string = 'icon-arrow-up';

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  constructor(
    private route: ActivatedRoute,
    private leaderService: LeaderService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.paginate.current_page = params['page'] || 1;
      this.fetchLeaders(this.paginate.current_page);
    });
  }

  fetchLeaders(pageNo = 1) {
    this.loading = true;
    this.leaderService
      .leadersList(pageNo, this.filterParam)
      .then(successResponse => {
        console.log('abc', successResponse);
        this.loading = false;
        this.paginate = successResponse.body.data;
        this.leaders = this.paginate.data;
        if (this.leaders.length === 0 && this.paginate.current_page > 1) {
          this.fetchLeaders();
        }
      })
      .catch(errorResponse => {
        console.log(errorResponse);
      });
  }

  resetFilterParam() {
    this.filterParam = new LeaderSearchParam();
    this.fetchLeaders();
  }

}
