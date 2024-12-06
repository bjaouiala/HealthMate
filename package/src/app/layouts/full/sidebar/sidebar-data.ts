import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'health-indices',
    iconName: 'rosette',
    bgcolor: 'accent',
    route: '/healthindices/list',
  },
  {
    displayName: 'Stats',
    iconName: 'poker-chip',
    bgcolor: 'warning',
    route: '/stats',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    bgcolor: 'success',
    route: '/ui-components/lists',
  },
  {
    displayName: 'post-list',
    iconName: 'list',
    bgcolor: 'success',
    route: '/posts',
  },
  {
    displayName: 'My post',
    iconName: 'list',
    bgcolor: 'success',
    route: '/posts/my-posts',
  },
  {
    displayName: 'medicament',
    iconName: 'layout-navbar-expand',
    bgcolor: 'error',
    route: '/uploadImages',
  },
  {
    displayName: 'events',
    iconName: 'tooltip',
    bgcolor: 'primary',
    route: '/events/list',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'predefined health goals',
    iconName: 'lock',
    bgcolor: 'accent',
    route: '/healthGoals/admin/predefined-health-goals',
  },
  {
    displayName: 'predefined Health goals user',
    iconName: 'user-plus',
    bgcolor: 'warning',
    route: '/healthGoals/user/user-predefined-health-goals',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    bgcolor: 'success',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/extra/sample-page',
  },
];
