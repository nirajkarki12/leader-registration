import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Leader'
  },
  {
    name: 'Registration',
    url: '/leader/create',
    icon: 'icon-plus',
  },
  {
    name: 'Leaders',
    url: '/leader',
    icon: 'icon-list',
  },
  {
    name: 'Unpaid Leaders',
    url: '/leader/unpaid-leaders',
    icon: 'icon-info',
  },
];
