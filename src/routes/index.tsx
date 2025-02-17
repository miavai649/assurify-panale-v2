import Dashboard from '../pages/Dashboard';
import { InstallationRequest } from '../pages/InstallationReqeust/InstallationRequest';
import SingleInstallationRequest from '../pages/InstallationReqeust/SingleInstallationRequest';
import Promotions from '../pages/Promotions';
import Stores from '../pages/stores';
import SingleStoreDetailsPage from '../pages/stores/SingleStoreDetailsPage';
import ThemeData from '../pages/ThemeData';
import SingleThemeData from '../pages/ThemeData/SingleThemeData';
import User from '../pages/user';

export const assurify_panel_routes = [
  {
    navigateLink: 'index',
    iconName: 'dashboard',
    title: 'Dashboard',
    pageTitle: 'Dashboard | Assurify Panel Dashboard',
    element: <Dashboard />,
  },
  {
    navigateLink: 'installation-request',
    iconName: 'installationRequest',
    title: 'Installation Request',
    pageTitle: 'Installation Request | Assurify Installation Request',
    element: <InstallationRequest />,
    children: [
      {
        navigateLink: '/installation-request/view/:id',
        pageTitle:
          'Single Installation Request | Assurify Single Installation Request',
        element: <SingleInstallationRequest />,
      },
    ],
  },
  {
    navigateLink: 'theme-data',
    iconName: 'themeData',
    title: 'Theme Data',
    pageTitle: 'Theme Data | Assurify Theme Data',
    element: <ThemeData />,
    children: [
      {
        navigateLink: 'theme-data/view/:id',
        pageTitle: 'Theme Data | Assurify Single Theme Data',
        element: <SingleThemeData />,
      },
    ],
  },
  {
    navigateLink: 'promotions',
    iconName: 'promotion',
    title: 'Promotions',
    pageTitle: 'Theme Data | Assurify Promotions',
    element: <Promotions />,
  },
  {
    navigateLink: 'stores',
    iconName: 'stores',
    title: 'Stores',
    pageTitle: 'Stores Data | Assurify Stores',
    element: <Stores />,
    children: [
      {
        navigateLink: 'stores/view/:id',
        pageTitle: 'Stores Data | Assurify Single Stores Details',
        element: <SingleStoreDetailsPage />,
      },
    ],
  },
  {
    navigateLink: 'user',
    iconName: 'users',
    title: 'Users',
    pageTitle: 'Users Data | Assurify Dashboard Users Data',
    element: <User />,
  },
];
