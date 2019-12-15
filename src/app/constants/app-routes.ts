import {environment} from '../../environments/environment';

export class AppRoutes {
  public static BASE_URL = environment.HOME_BASE_URL;
  public static login = 'login';
  public static dashboard = 'dashboard';
  public static edit = 'edit/:id';
  public static create = 'create';
  public static list = 'list';
  public static users = 'users';
  public static bank = 'bank';
  public static leader = 'leader';
  public static detail = 'detail/:id';
  public static atmCharge = 'atm-charge';
  public static unpaidLeaders = 'unpaid-leaders';
  // pages
  public static serverError = '500';
  public static notFound = '404';
  public static forbidden = '403';
}
