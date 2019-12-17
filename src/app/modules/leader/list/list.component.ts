import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as KhaltiCheckout from 'khalti-web';
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
  config;
  isCollapsed: boolean = true;
  iconCollapse: string = 'icon-arrow-up';

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  constructor(
    private route: ActivatedRoute,
    public leaderService: LeaderService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.paginate.current_page = params['page'] || 1;
      this.fetchLeaders(this.paginate.current_page);
    });
  }

  khaltiPay(leader: Leader) {
    if (confirm('Pay ' + leader.name  + '\'s charge on Khalti?')) {
      this.config = {
        // replace this key with yours
        'publicKey': 'test_public_key_d14da60ce2f74a6b806c7648288e857b',
        'productIdentity': leader.registration_code,
        'productName': 'Audition Form',
        'productUrl': 'http://gundruknetwork.com/the_leader_audition',
      };
      const _this = this;
      const _leader = leader;
      this.config.eventHandler = {
          onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            _this.khaltiVerify(payload, _leader);
          },
      };
      const checkout = new KhaltiCheckout(this.config);
      checkout.show({amount: 1000 * 100, mobile: leader.number});
    }
  }

  khaltiVerify(paylod, leader) {
    this.leaderService
      .khaltiVerify({'payload': paylod, 'leader': leader})
      .then(successResponse => {
        console.log(successResponse);
      })
      .catch(errorResponse => {
        console.log(errorResponse);
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
