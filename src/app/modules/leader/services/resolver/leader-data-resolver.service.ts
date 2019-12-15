import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { AppRoutes } from 'src/app/constants/app-routes';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { LeaderService } from '../leader.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderDataResolverService {

  constructor(
    private leaderService: LeaderService,
    private toastr: ValidatorMessageService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.leaderService.fetchLeaderDetail(route.paramMap.get('id'))
      .catch((err) => {
        this.toastr.showMessage(err.error.message, 'error');
        this.router.navigate([AppRoutes.leader + '/' + AppRoutes.list]);
      });
  }
}
