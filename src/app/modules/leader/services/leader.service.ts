import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConstants } from 'src/app/constants/api-constants';
// Models
import { Leader } from '../models/leader.model';
import { LeaderSearchParam } from '../models/LeaderSearchParam.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  leadersList(pageNo: Number, filterParam: LeaderSearchParam): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.LEADER +
      '?page=' + pageNo
      , filterParam ,
      { observe: 'response'} )
    .toPromise()
    .then(this.handleSuccess)
    .catch(this.handleError);
  }

  unpaidLeaders(pageNo: Number): Promise<any> {
    return this.http.get(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.LEADER +
      ApiConstants.UNPAID_LEADERS +
      '?page=' + pageNo
    )
    .toPromise()
    .then(this.handleSuccess)
    .catch(this.handleError);
  }

  create(leaderModel: Leader, image: File = null): Promise<any> {
    const input = new FormData();
    input.append('name', leaderModel.name);
    input.append('gender', leaderModel.gender);
    input.append('email', leaderModel.email);
    input.append('number', leaderModel.number);
    input.append('address', leaderModel.address);

    if (image) {
      input.append('image', image);
    }

    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.LEADER +
      ApiConstants.STORE
      , input,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  fetchLeaderDetail(id): Promise<any> {
    return this.http
      .get(
        ApiConstants.API_ENDPOINT +
        ApiConstants.ADMIN +
        ApiConstants.V1 +
        ApiConstants.LEADER +
        ApiConstants.DETAIL + '/' +
        id
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  update(leaderModel: Leader, image: File = null): Promise<any> {
    const input = new FormData();
    input.append('id', leaderModel.id);
    input.append('name', leaderModel.name);
    input.append('gender', leaderModel.gender);
    input.append('email', leaderModel.email);
    input.append('number', leaderModel.number);
    input.append('address', leaderModel.address);

    if (image) {
      input.append('image', image);
    }
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.LEADER +
      ApiConstants.UPDATE
      , input,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  handleSuccess(response: any): Promise<any> {
    return Promise.resolve(response);

  }

  handleError(response: any): Promise<any> {
    return Promise.reject(response);
  }
}
